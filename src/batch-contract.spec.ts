/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { BatchContract } from '.';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import winston = require('winston');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
    public stub: sinon.SinonStubbedInstance<ChaincodeStub> = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: sinon.SinonStubbedInstance<ClientIdentity> = sinon.createStubInstance(ClientIdentity);
    public logger = {
        getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
        setLevel: sinon.stub(),
     };
}

describe('BatchContract', () => {

    let contract: BatchContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new BatchContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"batch 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"batch 1002 value"}'));
    });

    describe('#batchExists', () => {

        it('should return true for a batch', async () => {
            await contract.batchExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a batch that does not exist', async () => {
            await contract.batchExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createBatch', () => {

        it('should create a batch', async () => {
            await contract.createBatch(ctx, '1003', 12, 'batch 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"batch 1003 value"}'));
        });

        it('should throw an error for a batch that already exists', async () => {
            await contract.createBatch(ctx, '1001',12, 'myvalue').should.be.rejectedWith(/The batch 1001 already exists/);
        });

    });

    describe('#readBatch', () => {

        it('should return a batch', async () => {
            await contract.getStatus(ctx, '1001').should.eventually.deep.equal({ value: 'batch 1001 value' });
        });

        it('should throw an error for a batch that does not exist', async () => {
            await contract.getStatus(ctx, '1003').should.be.rejectedWith(/The batch 1003 does not exist/);
        });

    });

    describe('#updateBatch', () => {

        it('should update a batch', async () => {
            await contract.updateBatch(ctx, '1001', 'batch 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"batch 1001 new value"}'));
        });

        it('should throw an error for a batch that does not exist', async () => {
            await contract.updateBatch(ctx, '1003', 'batch 1003 new value').should.be.rejectedWith(/The batch 1003 does not exist/);
        });

    });

    describe('#deleteBatch', () => {

        it('should delete a batch', async () => {
            await contract.deleteBatch(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a batch that does not exist', async () => {
            await contract.deleteBatch(ctx, '1003').should.be.rejectedWith(/The batch 1003 does not exist/);
        });

    });

});
