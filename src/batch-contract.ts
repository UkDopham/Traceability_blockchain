/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Batch} from './batch';
import { ChangeOwnerEvent } from './changeBatchOwnerEvent';
import { CreateBatchEvent } from './createBatchEvent';
import { TimestampMapper } from './timestamp';
import { v1 as uuid } from 'uuid'; // first : npm install uuid
import { ViewProducerHistoryEvent} from './ViewProducerHistoryEvent';
import { AddCertificationEvent } from './AddCertificationEvent';
@Info({title: 'BatchContract', description: 'FabBatch Smart Contract' })
export class BatchContract extends Contract {

    // estimate the blockchain(no changement ) , look if thr batch alredy exist
    @Transaction(false)
    @Returns('boolean')
    public async batchExists(ctx: Context, batchId: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(batchId);
        return (!!data && data.length > 0);
    }

    // create a new Batch
    @Transaction()
    public async createBatch(ctx: Context, batchId: string, weight: number, producerId: string, ): Promise<void> {
        console.info('============= START : Create Batch ===========');
        const exists: boolean = await this.batchExists(ctx, batchId);
        if (exists) {
            throw new Error(`The batch ${batchId} already exists`);
        }
        // generate an id to pin to the batch (auto-increment / UUID / GUID)
        const bid= uuid(); 

        if (!weight) {
            throw new Error(`The car ${batchId} cannot be created as the 'weight' parameter is empty.`);
        }
        if (!producerId) {
            throw new Error(`The car ${batchId} cannot be created as the 'model' parameter is empty.`);
        }
        const batch: Batch = {
            batchId:bid,
            weight,
            producerId,
            //date,
            docType: 'coton',
        };

        //const batch: Batch = new Batch();
        //batch.value = value;
        const buffer: Buffer = Buffer.from(JSON.stringify(batch));
        await ctx.stub.putState(batchId, buffer);

        // emit an event to inform listeners that a car has been created
        const txDate = TimestampMapper.toDate(ctx.stub.getTxTimestamp());
        // GetTxTimestamp returns the timestamp when the transaction was created
        const createBatchEvent = new CreateBatchEvent(batchId, weight,producerId, txDate);
        ctx.stub.setEvent(createBatchEvent.docType, Buffer.from(JSON.stringify(createBatchEvent)));

        console.info('============= END : Create Batch ===========');

    }

    @Transaction(false)
    @Returns('Batch')
    public async getStatus(ctx: Context, batchId: string): Promise<Batch> {
        console.info('============= START : Get status ===========');
        const exists: boolean = await this.batchExists(ctx, batchId);
        if (!exists) {
            throw new Error(`The batch ${batchId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(batchId);
        const batch: Batch = JSON.parse(data.toString()) as Batch;
        return batch;
    }

    /*@Transaction()
    public async updateBatch(ctx: Context, batchId: string, newValue: string): Promise<void> {
        const exists: boolean = await this.batchExists(ctx, batchId);
        if (!exists) {
            throw new Error(`The batch ${batchId} does not exist`);
        }
        const batch: Batch = new Batch();
        batch.value = newValue;
        const buffer: Buffer = Buffer.from(JSON.stringify(batch));
        await ctx.stub.putState(batchId, buffer);
    }*/

    @Transaction()
    public async deleteBatch(ctx: Context, batchId: string): Promise<void> {
        console.info('============= START : Delete Batch ===========');
        const exists: boolean = await this.batchExists(ctx, batchId);
        if (!exists) {
            throw new Error(`The batch ${batchId} does not exist`);
        }

        // get the car we want to modify and the current certOwner from it
        const buffer = await ctx.stub.getState(batchId); // get the batch from chaincode state
        const batch = JSON.parse(buffer.toString()) as Batch;
        const currentProducer = batch.producerId;

        // no delte for now , but if wanted create DeleteBatchEvent.ts
        //await ctx.stub.deleteState(batchId);

        /*
        // emit an event to inform listeners that a car has been deleted
        const txDate = TimestampMapper.toDate(ctx.stub.getTxTimestamp());
        const deleteBatchEvent = new DeleteBatchEvent(batchId, currentProducer, txDate);
        ctx.stub.setEvent(deleteBatchEvent.docType, Buffer.from(JSON.stringify(deleteBatchEvent)));
        */
        console.info('============= END : Delete Car ===========');
    }

    @Transaction()
    public async changeBatchOwner(ctx: Context, batchId: string, newProducer: string)
    {
      console.info('============= START : changeCarOwner ===========');
  
      const exists = await this.batchExists(ctx, batchId);
      if (!exists) {
        throw new Error(`The batch ${batchId} does not exist.`);
      }
  
      // get the car we want to modify and the current certOwner from it
      const buffer = await ctx.stub.getState(batchId); // get the car from chaincode state
      const batch = JSON.parse(buffer.toString()) as Batch;
      //const carCertId = car.certOwner;
  
      if (!newProducer) {
        throw new Error(`The ownership of car ${batchId} cannot be changed as the 'newProducer' parameter is empty.`);
      }
  
      if (batch.producerId.toLowerCase() === newProducer.toLowerCase()) {
        throw new Error(`The ownership of car ${batchId} cannot be changed as the current owner '${batch.producerId}' and the new owner are the same.`);
      }
      //#region 
      // get the client ID so we can make sure they are allowed to modify the car
      //const cid = new ClientIdentity(ctx.stub);
      //const clientCertId = cid.getID();
  
      // the rule is to be able to modify a car you must be the current certOwner for it
      // which usually means you are the creater of it or have had it transfered to your FabricUserID (CN)
      /*if (carCertId !== clientCertId) {
  
        // we are not the certOwner for it, but see if it has been transfered to us via a
        // changeCarOwner() transaction - which means we check our CN against the current external owner
        const clientCN = Utils.extractCN(clientCertId);
        if (clientCN !== car.owner) {
          // special case IBM Org which can take ownership of anything
          const msp = cid.getMSPID();
          if (msp !== 'IBMMSP') {
            const carCN = Utils.extractCN(carCertId);
            throw new Error(`The ownership of car ${batchId} cannot be changed. User ${clientCN} not authorised to change a car owned by ${carCN}.`);
          }
        } else {
          // as the car has been transfered to us, we need to take "full" ownership of it
          // this prevents the previous owner deleting it for example. IBM Org does not need to do this!
  
          // but first make sure we do not already have too many cars
          await Utils.checkForMaxCars(batchId, clientCertId, cid, ctx, true); // this will throw if not ok
          car.certOwner = clientCertId;
        }
      }*/
      //#endregion
      // set the new owner into the car
      //const previousProducers = car.owner;
      batch.producerId = newProducer;
  
      // put the car into the RWSET for adding to the ledger
      await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
  
      // emit an event to inform listeners that a car has had its owner changed
      const txDate = TimestampMapper.toDate(ctx.stub.getTxTimestamp());
      const changeOwnerEvent = new ChangeOwnerEvent(batchId, newProducer, txDate);
      ctx.stub.setEvent(changeOwnerEvent.docType, Buffer.from(JSON.stringify(changeOwnerEvent)));
  
      console.info('============= END : changeCarOwner ===========');
    }

    @Transaction()
  public async addCertification(ctx: Context, batchId: string, certification: string)
  {
    console.info('============= START : resprayCar ===========');

    const exists = await this.batchExists(ctx, batchId);
    if (!exists) {
      throw new Error(`The car ${batchId} does not exist.`);
    }


    // get the car we want to modify and the current certOwner from it
    const buffer = await ctx.stub.getState(batchId); // get the car from chaincode state
    const batch = JSON.parse(buffer.toString()) as Batch;

    if (!certification) {
      throw new Error(`The car ${batchId} cannot be resprayed as the 'certification' parameter is empty and we are out of invisible paint :-)`);
    }

    if (batch.certification.includes(certification.toLowerCase())) {
      throw new Error(`The certification ${certification} cannot be added to the current currentin '${batch.batchId}' as it already exists.`);
    }
    //#region 
    // get the client ID so we can make sure they are allowed to modify the car
    /*const cid = new ClientIdentity(ctx.stub);
    const clientCertId = cid.getID();

    // the rule is to be able to modify a car you must be the current certOwner for it
    // which usually means you are the creater of it or have had it transfered to your FabricUserID (CN)
    if (carCertId !== clientCertId) {

      // we are not the certOwner for it, but see if it has been transfered to us via a
      // changeCarOwner() transaction - which means we check our CN against the current external owner
      const clientCN = Utils.extractCN(clientCertId);
      if (clientCN !== car.owner) {
        // special case IBM Org which can take ownership of anything
        const msp = cid.getMSPID();
        if (msp !== 'IBMMSP') {
          const carCN = Utils.extractCN(carCertId);
          throw new Error(`The color of car ${batchId} cannot be changed. User ${clientCN} not authorised to change a car owned by ${carCN}.`);
        }
      } else {
        // as the car has been transfered to us, we need to take "full" ownership of it
        // this prevents the previous owner deleting it for example. IBM Org does not need to do this!

        // but first make sure we do not already have too many cars
        await Utils.checkForMaxCars(batchId, clientCertId, cid, ctx, true); // this will throw if not ok
        car.certOwner = clientCertId;
      }
    }*/

    // set the new color into the car
    //const previousColor = car.color;
    //car.color = certification;

    // put the car into the RWSET for adding to the ledger
    //#endregion
    // Doute
    batch.certification.push(certification)
    await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));

    // emit an event to inform listeners that a car has had its color changed
    const txDate = TimestampMapper.toDate(ctx.stub.getTxTimestamp());
    const addCertificationEvent = new AddCertificationEvent(batchId, certification, txDate);
    ctx.stub.setEvent(addCertificationEvent.docType, Buffer.from(JSON.stringify(addCertificationEvent)));

    console.info('============= END : add certification ===========');
  }
    
  @Transaction()
  @Returns('ViewProducerHistoryEvent')
  public async getPreviousProducers(ctx: Context, batchId: string): Promise<ViewProducerHistoryEvent>
  {
    console.info('============= START : getpreviousProducers ===========');

    const exists = await this.batchExists(ctx, batchId);
    if (!exists) {
      throw new Error(`The batch ${batchId} does not exist.`);
    }

    // Note: as of fabric 2.0 getHistoryForKey() is guaranteed to return data "newest to oldest" so most recent first
    const historyIterator = await ctx.stub.getHistoryForKey(batchId);
    const previousProducers: string[] = [];
    const previousProducerChangeDates: Date[] = [];
    let previousProducersCount = 0;
    let previousProducer = '';
    let currentProducer = '';
    let currentProducerChangeDate: Date = new Date();
    let first = true;
    while (true) {
      const res = await historyIterator.next();
      if (res.value) {
        let currentBatchProducer = '';
        
        const txnTs = res.value.getTimestamp();
        const txnDate = TimestampMapper.toDate(txnTs);
        if (res.value.is_delete) {
          currentBatchProducer = 'CAR KEY DELETED';
        } else {
          // console.log(res.value.value.toString('utf8'));
          try {
            const batch = JSON.parse(res.value.value.toString('utf8')) as Batch;
            currentBatchProducer = batch.producerId;

          } catch (err) {
            // result = 'Invalid JSON';
            console.log(err);
            throw new Error(`The car ${batchId} has an invalid JSON record ${res.value.value.toString('utf8')}.`);
          }
        }

        if (first) {
          // keep current owner out of previousProducers list and count.
          // this relies on the car existing (so not being a deleted car for current owner)
          // but as we always check that the carExists() first that should not be a problem
          currentProducer = currentBatchProducer;
          currentProducerChangeDate = txnDate;
          first = false;
        } else {
          let includeTxn = true;
          // bounce over deletes as we keep those in the list...
          if (!res.value.is_delete) {
            // we start checking on the second (and subsequent) time through so we aways have previous details
            if ((previousProducer === currentBatchProducer) ||
              (previousProducer === currentBatchProducer)) {
              // this indicates this txn was followed by a ConfirmTransfer txn or was a different type of
              // none ownership transfering txn such as a resprayCar txn which means we keep this one
              // out of the previous owners lists as otherwise it looks like a duplicate transfer happened.
              includeTxn = false;
              console.log('Skipping txn: ', previousProducersCount, currentBatchProducer, txnDate.toString());
            }
          }

          if (includeTxn) {
            ++previousProducersCount;
            previousProducers.push(currentBatchProducer);
            previousProducerChangeDates.push(txnDate);
          }
        }

        // store for next iteration
        previousProducer = currentBatchProducer;

      }
      if (res.done) {
        // console.log('end of data');
        await historyIterator.close();
        break;
      }
    }

    // create the return data
    const allresults = new ViewProducerHistoryEvent(
      previousProducersCount,
      previousProducers,
      previousProducerChangeDates,
      currentProducer,
      currentProducerChangeDate,
    );

    console.info('============= END : getpreviousProducers ===========');
    return allresults;
  }

}
