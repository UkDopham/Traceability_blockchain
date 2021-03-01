/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Batch} from './batch';
import { ChangeOwnerEvent } from './changeBatchOwnerEvent';
import { CreateBatchEvent } from './createBatchEvent';
import { TimestampMapper } from './timestamp';
import { v1 as uuid } from 'uuid'; // first : npm install uuid
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
        const currentOwner = batch.producerId;

        // no delte for now , but if wanted create DeleteBatchEvent.ts
        //await ctx.stub.deleteState(batchId);

        /*
        // emit an event to inform listeners that a car has been deleted
        const txDate = TimestampMapper.toDate(ctx.stub.getTxTimestamp());
        const deleteBatchEvent = new DeleteBatchEvent(batchId, currentOwner, txDate);
        ctx.stub.setEvent(deleteBatchEvent.docType, Buffer.from(JSON.stringify(deleteBatchEvent)));
        */
        console.info('============= END : Delete Car ===========');
    }
    // ChangeOwner
    
    // ViewOwnerHistory
    // Add Certification
}
