/*
 * SPDX-License-Identifier: Apache-2.0
 */
import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { ClientIdentity, Iterators } from 'fabric-shim';
import { Batch } from './batch';
import { ChangeProducerEvent } from './changeBatchProducerEvent';
import { AddCertificationEvent } from './addCertificationEvent';
import { CreateBatchEvent } from './createBatchEvent';
import { PreviousProducersResult } from './previousProducers';
import { TimestampMapper } from './timestamp';
// import { Utils } from './utils';

@Info({ title: 'Batches', description: 'Batches Smart Contract' })
export class Batches extends Contract
{

  @Transaction()
  @Returns('Batch')
  public async queryBatch(ctx: Context, id: string): Promise<Batch>
  {
    let outputAll = false;
    const transientData = ctx.stub.getTransient();
    if (transientData.has('QueryOutput')) {
      const value = transientData.get('QueryOutput');
      if (value?.toString('utf8') === 'all') {
        outputAll = true;
      }
    }
    const buffer = await ctx.stub.getState(id); 
    const batch = JSON.parse(buffer.toString()) as Batch;
    return batch;
  }
  
  @Transaction()
  public async createBatch(ctx: Context, id:string, producerId:string,weight: number)
  {
    const cid = new ClientIdentity(ctx.stub);
    const clientCertId = cid.getID();
    if (!weight) {
      throw new Error(`The batch ${id} cannot be created as the 'weight' parameter is empty.`);
    }

    if (!producerId) {
      throw new Error(`The batch ${id} cannot be created as the 'producerId' parameter is empty.`);
    }
    const txDate = TimestampMapper.toDate(ctx.stub.getTxTimestamp());

    const batch: Batch = {
      id,
      weight,
      producerId,
      type: 'coton brut',
    };
    const buffer = Buffer.from(JSON.stringify(batch));
    await ctx.stub.putState(id, buffer);
    const createBatchEvent = new CreateBatchEvent(id,weight,txDate, producerId);
    ctx.stub.setEvent(createBatchEvent.docType, Buffer.from(JSON.stringify(createBatchEvent)));
  }


  @Transaction()
  public async changeBatchProducer(ctx: Context, id: string, newProducerId: string)
  {
    const buffer = await ctx.stub.getState(id);
    const batch = JSON.parse(buffer.toString()) as Batch;
    if (!newProducerId) {
      throw new Error(`The ownership of batch ${id} cannot be changed as the 'newProducer' parameter is empty.`);
    }
    if (batch.producerId.toLowerCase() === newProducerId.toLowerCase()) {
      throw new Error(`The producerIdship of batch ${id} cannot be changed as the current producerid '${batch.producerId}' and the new producerid are the same.`);
    }
    const cid = new ClientIdentity(ctx.stub);
    const clientCertId = cid.getID();
    batch.producerId = newProducerId;
    if (batch.producerId.charAt(0)==='2'){
      batch.type= "coton égrené"
    }
    else if (batch.producerId.charAt(0)==='3'){
      batch.type= "coton filé"
    }
    else if (batch.producerId.charAt(0)==='4'){
      batch.type= "vêtement"
    }
    else if (batch.producerId.charAt(0)==='5'){
      batch.type= "vêtement stocké"
    }
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(batch)));
    const txDate = TimestampMapper.toDate(ctx.stub.getTxTimestamp());
    const changeProducerEvent = new ChangeProducerEvent(id, newProducerId, txDate);
    ctx.stub.setEvent(changeProducerEvent.docType, Buffer.from(JSON.stringify(changeProducerEvent)));
  }

  @Transaction()
public async certificateBatch(ctx: Context, id: string, certification: string)
{
  const buffer = await ctx.stub.getState(id);
  const batch = JSON.parse(buffer.toString()) as Batch;
  if (!certification) {
    throw new Error(`The batch ${id} cannot be certificated as the 'certification' parameter is empty`);
  }
  if (batch.certification){
    
    if (batch.certification.includes(certification.toLowerCase())) {
      throw new Error(`The batch ${id} cannot be certificated again with the same certificate (${certification}) .`);
    }
    batch.certification.push(certification)
  }
  else {
    batch.certification= [certification]
  }
  await ctx.stub.putState(id, Buffer.from(JSON.stringify(batch)));
  const txDate = TimestampMapper.toDate(ctx.stub.getTxTimestamp());
  const addCertificationEvent = new AddCertificationEvent(id, certification, txDate);
  ctx.stub.setEvent(addCertificationEvent.docType, Buffer.from(JSON.stringify(addCertificationEvent)));
}

  @Transaction()
  @Returns('PreviousOwnersResult')
  public async getPreviousProducers(ctx: Context, id: string): Promise<PreviousProducersResult>
  {
    const historyIterator = await ctx.stub.getHistoryForKey(id);
    const previousProducers: string[] = [];
    const previousOwnershipChangeDates: Date[] = [];
    let previousProducerCount=0;
    let currentProducer = '';
    let currentOwnershipChangeDate: Date = new Date();
    let first = true;
    while (true) {
      const res = await historyIterator.next();
      if (res.value) {
        let currentBatchProducer = '';
        const txnTs = res.value.getTimestamp();
        const txnDate = TimestampMapper.toDate(txnTs);
        if (res.value.is_delete) {
          currentBatchProducer = 'BATCH KEY DELETED';
        } else {
          try {
            const batch = JSON.parse(res.value.value.toString('utf8')) as Batch;
            currentBatchProducer = batch.producerId;
          } catch (err) {
            console.log(err);
            throw new Error(`The batch ${id} has an invalid JSON record ${res.value.value.toString('utf8')}.`);
          }
        }
        if (first) {
          currentProducer = currentBatchProducer;
          currentOwnershipChangeDate = txnDate;
          first = false;
        } else {
          let includeTxn = true;
          if (includeTxn) {
            ++previousProducerCount;
            previousProducers.push(currentBatchProducer);
            previousOwnershipChangeDates.push(txnDate);
          }
        }
      }
      if (res.done) {
        await historyIterator.close();
        break;
      }
    }
    const allresults = new PreviousProducersResult(
      previousProducerCount,
      previousProducers,
      previousOwnershipChangeDates,
      currentProducer,
      currentOwnershipChangeDate,
    );
    return allresults;
  }

}
