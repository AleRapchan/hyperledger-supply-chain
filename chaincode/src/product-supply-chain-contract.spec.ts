/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { ProductSupplyChainContract } from '.';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import winston = require('winston');
import { Product } from './models/product';

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

describe('ProductSupplyChainContract', () => {

    let contract: ProductSupplyChainContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new ProductSupplyChainContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"product 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"product 1002 value"}'));
    });

    describe('#productExists', () => {

        it('should return true for a product', async () => {
            await contract.productExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a product that does not exist', async () => {
            await contract.productExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createProduct', () => {

        it('should create a product', async () => {
            const product = new Product();
            product.id = '1003';
            await contract.createProduct(ctx, product);
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"product 1003 value"}'));
        });

    });
});
