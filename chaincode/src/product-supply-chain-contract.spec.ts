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
import { ProductWithHistory } from './models/product-with-history';

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
    product.misc = JSON.stringify({});
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
            "misc": "{}",
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
            "misc": "{}",
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

            await contract.createProduct(ctx, JSON.stringify(product));

            ctx.stub.putState.should.have.been.calledOnceWith('1003');
        });

        it('should throw an error for a product that already exists', async () => {
            const product = createNewProduct();
            product.id = '1001';
            await contract.createProduct(ctx, JSON.stringify(product)).should.be.rejectedWith(/The product 1001 already exists./);
        });

        it('should throw an error for a product with missing id', async () => {
            const product = createNewProduct();
            product.id = '';
            await contract.createProduct(ctx, JSON.stringify(product)).should.be.rejectedWith(/The 'id' field is required./);
        });

        it('should throw an error for a product with missing name', async () => {
            const product = createNewProduct();
            product.name = '';
            await contract.createProduct(ctx, JSON.stringify(product)).should.be.rejectedWith(/The 'name' field is required./);
        });
    });

    describe('#shipProductTo', () => {
        it('should change current product location data to a new one', async () => {
            // arrange
            const productId = '1001';
            const newLocation = 'New Location';
            const newLocationArrivalDate = '2021-07-01T18:00:58.511Z';

            // act
            await contract.shipProductTo(ctx, productId, newLocation, newLocationArrivalDate);

            // assert
            ctx.stub.putState.should.have.been.calledWith(productId, sinon.match((data: Buffer) => {
                const updatedProduct = JSON.parse(data.toString()) as Product;
                return updatedProduct.locationData.current.location === newLocation &&
                    updatedProduct.locationData.current.arrivalDate === newLocationArrivalDate;
            }));
        });

        it('should move old location to the "previous" collection', async () => {
            // arrange
            const productId = '1001';
            const prevLocation = 'Markham Farm, Marham, ON, Canada';
            const prevLocationArrivalDate = '2021-06-30T18:00:58.511Z';
            const product = new Product();
            product.id = '1001';
            product.barcode = '1234567890';
            product.batchQuantity = 1000;
            product.category = 'Fruits';
            product.componentProductIds = [];
            product.expirationDate = '2022-06-24T18:25:43.511Z';
            product.misc = JSON.stringify({});
            product.name = 'Apples';
            product.placeOfOrigin = 'Markham, ON, Canada';
            product.productionDate = '2021-06-24T18:25:43.511Z';
            product.unitPrice = '$5.00';
            product.unitQuantity = 300;
            product.unitQuantityType = 'mg';
            product.variety = null;

            const locationData = new ProductLocationData();
            locationData.current = new ProductLocationEntry({
                arrivalDate: prevLocationArrivalDate,
                location: prevLocation,
            });
            locationData.previous = [];
            product.locationData = locationData;

            ctx.stub.getState.withArgs('1001').resolves(Buffer.from(JSON.stringify(product)));

            // act
            await contract.shipProductTo(ctx, productId, 'New Location', '2021-07-01T18:00:58.511Z');

            // assert
            ctx.stub.putState.should.have.been.calledWith(productId, sinon.match((data: Buffer) => {
                const updatedProduct = JSON.parse(data.toString()) as Product;
                const lastElementIndex = updatedProduct.locationData.previous.length - 1;

                return updatedProduct.locationData.previous[lastElementIndex].arrivalDate === prevLocationArrivalDate
                    && updatedProduct.locationData.previous[lastElementIndex].location === prevLocation;
            }));
        });

        it('should throw an error for a product that does not exist', async () => {
            await contract.shipProductTo(ctx, '1003', 'New Location', '2021-06-24T18:25:43.511Z').should.be.rejectedWith(/The product 1003 does not exist./);
        });

        it('should throw an error if new location is empty', async () => {
            await contract.shipProductTo(ctx, '1001', '', '2021-06-24T18:25:43.511Z').should.be.rejectedWith(/The 'newLocation' field is required./);
        });

        it('should throw an error if new location arrival date is empty', async () => {
            await contract.shipProductTo(ctx, '1001', 'New Location', '').should.be.rejectedWith(/The 'arrivalDate' field is required./);
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
            expectedProduct.misc = JSON.stringify({});
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

    describe('#getProductWithHistory', () => {
        it('should return a product with its previous products', async () => {
            const rootProductId = '1001';
            const childProduct1Id = '880';
            const childProduct2Id = '990';

            const rootProduct = new ProductWithHistory();
            rootProduct.id = rootProductId;
            rootProduct.barcode = '1234567890';
            rootProduct.batchQuantity = 1000;
            rootProduct.category = 'Fruits';
            rootProduct.componentProductIds = [];
            rootProduct.expirationDate = '2022-06-24T18:25:43.511Z';
            rootProduct.misc = JSON.stringify({});
            rootProduct.name = 'Apples';
            rootProduct.placeOfOrigin = 'Markham, ON, Canada';
            rootProduct.productionDate = '2021-06-24T18:25:43.511Z';
            rootProduct.unitPrice = '$5.00';
            rootProduct.unitQuantity = 300;
            rootProduct.unitQuantityType = 'mg';
            rootProduct.variety = null;

            const locationData = new ProductLocationData();
            locationData.current = new ProductLocationEntry({
                arrivalDate: '2021-06-30T18:00:58.511Z',
                location: 'Markham Farm, Marham, ON, Canada',
            });
            locationData.previous = [];
            rootProduct.locationData = locationData;

            const childProduct1 = new ProductWithHistory();
            childProduct1.id = childProduct1Id;
            const childProduct2 = new ProductWithHistory();
            childProduct2.id = childProduct2Id;

            rootProduct.componentProductIds = [childProduct1Id, childProduct2Id];
            rootProduct.componentProducts = [childProduct1, childProduct2];

            ctx.stub.getState.withArgs('1001').resolves(Buffer.from(JSON.stringify(rootProduct)));
            ctx.stub.getState.withArgs('880').resolves(Buffer.from(JSON.stringify(childProduct1)));
            ctx.stub.getState.withArgs('990').resolves(Buffer.from(JSON.stringify(childProduct2)));

            await contract.getProductWithHistory(ctx, '1001').should.eventually.satisfy((p: ProductWithHistory) => {
                return p.id === rootProductId &&
                    p.componentProducts[0] &&
                    p.componentProducts[0].id === childProduct1Id &&
                    p.componentProducts[1] &&
                    p.componentProducts[1].id === childProduct2Id;
            });
        });

        it('should throw an error for a product that does not exist', async () => {
            await contract.getProductWithHistory(ctx, '1003').should.be.rejectedWith(/The product 1003 does not exist./);
        });
    });
});
