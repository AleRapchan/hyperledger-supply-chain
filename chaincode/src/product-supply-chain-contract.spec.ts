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
import { ProductLocationData } from './models/product-location-data';
import { ProductLocationEntry } from './models/product-location-entry';
import { describe } from 'mocha';

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

const createNewProduct = () => {
    const product = new Product();
    product.id = '1003';
    product.barcode = '1234567890';
    product.batchQuantity = 1000;
    product.category = 'Fruit Jams';
    product.componentProductIds = [];
    product.expirationDate = '2022-06-24T18:25:43.511Z';
    product.misc = {};
    product.name = 'Apple Jam';
    product.placeOfOrigin = 'Etobicoke, ON, Canada';
    product.productionDate = '2021-06-24T18:25:43.511Z';
    product.unitPrice = '$5.00';
    product.unitQuantity = 300;
    product.unitQuantityType = 'mg';
    product.variety = null;

    const locationData = new ProductLocationData();
    locationData.current = new ProductLocationEntry({
        arrivalDate: '2021-06-30T18:00:58.511Z',
        location: 'Walmart Supercentre - 900 Dufferin St, Toronto, ON',
    });
    locationData.previous = [
        new ProductLocationEntry({
            arrivalDate: '2021-06-24T18:25:43.511Z',
            location: 'Etobicoke, ON, Canada',
        }),
        new ProductLocationEntry({
            arrivalDate: '2021-06-25T09:05:12.511Z',
            location: 'Brampton, ON, Canada',
        }),
    ];
    product.locationData = locationData;

    return product;
};

describe('ProductSupplyChainContract', () => {

    let contract: ProductSupplyChainContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new ProductSupplyChainContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from(`{
            "id": "1001",
            "barcode": "1234567890",
            "batchQuantity": 1000,
            "category": "Fruits",
            "componentProductIds": [],
            "expirationDate": "2022-06-24T18:25:43.511Z",
            "misc": {},
            "name": "Apples",
            "placeOfOrigin": "Markham, ON, Canada",
            "productionDate": "2021-06-24T18:25:43.511Z",
            "unitPrice": "$5.00",
            "unitQuantity": 300,
            "unitQuantityType": "mg",
            "variety": null,
            "locationData": {
                "current": {
                    "arrivalDate": "2021-06-30T18:00:58.511Z",
                    "location": "Markham Farm, Marham, ON, Canada"
                },
                "previous": []
            }
        }`));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from(`{
            "id": "1002",
            "barcode": "1234567890",
            "batchQuantity": 1000,
            "category": "Fruits",
            "componentProductIds": [],
            "expirationDate": "2022-06-24T18:25:43.511Z",
            "misc": {},
            "name": "Apples",
            "placeOfOrigin": "Marham, ON, Canada",
            "productionDate": "2021-06-24T18:25:43.511Z",
            "unitPrice": "$5.00",
            "unitQuantity": 300,
            "unitQuantityType": "mg",
            "variety": null,
            "locationData": {
                "current": {
                    "arrivalDate": "2021-06-30T18:00:58.511Z",
                    "location": "Markham Farm, Marham, ON, Canada"
                },
                "previous": []
            }
        }`));
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
            const product = createNewProduct();
            console.log(JSON.stringify(product));
            await contract.createProduct(ctx, product);
            ctx.stub.putState.should.have.been.calledOnceWith('1003');
        });

        it('should throw an error for a product that already exists', async () => {
            const product = createNewProduct();
            product.id = '1001';
            await contract.createProduct(ctx, product).should.be.rejectedWith(/The product 1001 already exists./);
        });

        it('should throw an error for a product with missing id', async () => {
            const product = createNewProduct();
            product.id = '';
            await contract.createProduct(ctx, product).should.be.rejectedWith(/The 'id' field is required./);
        });

        it('should throw an error for a product with missing name', async () => {
            const product = createNewProduct();
            product.name = '';
            await contract.createProduct(ctx, product).should.be.rejectedWith(/The 'name' field is required./);
        });

    });

    describe('#getProduct', () => {

        it('should return a product', async () => {
            const expectedProduct = new Product();
            expectedProduct.id = '1001';
            expectedProduct.barcode = '1234567890';
            expectedProduct.batchQuantity = 1000;
            expectedProduct.category = 'Fruits';
            expectedProduct.componentProductIds = [];
            expectedProduct.expirationDate = '2022-06-24T18:25:43.511Z';
            expectedProduct.misc = {};
            expectedProduct.name = 'Apples';
            expectedProduct.placeOfOrigin = 'Markham, ON, Canada';
            expectedProduct.productionDate = '2021-06-24T18:25:43.511Z';
            expectedProduct.unitPrice = '$5.00';
            expectedProduct.unitQuantity = 300;
            expectedProduct.unitQuantityType = 'mg';
            expectedProduct.variety = null;

            const locationData = new ProductLocationData();
            locationData.current = new ProductLocationEntry({
                arrivalDate: '2021-06-30T18:00:58.511Z',
                location: 'Markham Farm, Marham, ON, Canada',
            });
            locationData.previous = [];
            expectedProduct.locationData = locationData;

            await contract.getProduct(ctx, '1001').should.eventually.deep.equal(expectedProduct);
        });

        it('should throw an error for a product that does not exist', async () => {
            await contract.getProduct(ctx, '1003').should.be.rejectedWith(/The product 1003 does not exist./);
        });
    });
});
