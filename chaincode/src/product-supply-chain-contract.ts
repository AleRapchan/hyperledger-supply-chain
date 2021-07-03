/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Product } from './models/product';
import { ProductLocationEntry } from './models/product-location-entry';
import { ProductWithHistory } from './models/product-with-history';

@Info({title: 'ProductSupplyChain', description: 'Smart Contract for handling product supply chain.' })
export class ProductSupplyChainContract extends Contract {
    @Transaction(false)
    @Returns('boolean')
    public async productExists(ctx: Context, productId: string): Promise<boolean> {
        const data = await ctx.stub.getState(productId);
        return (!!data && data.length > 0);
    }

    @Transaction()
    public async createProduct(ctx: Context, productJson: string): Promise<void> {
        const product = JSON.parse(productJson) as Product;

        const exists: boolean = await this.productExists(ctx, product.id);
        if (exists) {
            throw new Error(`The product ${product.id} already exists.`);
        }

        this.requireField(product.id, 'id');
        this.requireField(product.name, 'name');
        this.requireField(product.barcode, 'barcode');
        this.requireField(product.placeOfOrigin, 'placeOfOrigin');
        this.requireField(product.productionDate, 'productionDate');
        this.requireField(product.expirationDate, 'expirationDate');
        this.requireField(product.unitQuantity, 'unitQuantity');
        this.requireField(product.unitQuantityType, 'unitQuantityType');
        this.requireField(product.unitPrice, 'unitPrice');
        this.requireField(product.category, 'category');
        this.requireField(product.locationData.current.location, 'locationData.current.location');
        this.requireField(product.locationData.current.arrivalDate, 'locationData.current.arrivalDate');

        const buffer = Buffer.from(JSON.stringify(product));
        await ctx.stub.putState(product.id, buffer);
    }

    @Transaction()
    public async shipProductTo(ctx: Context, productId: string, newLocation: string, arrivalDate: string): Promise<void> {
        const exists: boolean = await this.productExists(ctx, productId);
        if (!exists) {
            throw new Error(`The product ${productId} does not exist.`);
        }

        this.requireField(newLocation, 'newLocation');
        this.requireField(arrivalDate, 'arrivalDate');

        const product = await this.readProduct(ctx, productId);

        product.locationData.previous.push(new ProductLocationEntry({
            arrivalDate: product.locationData.current.arrivalDate,
            location: product.locationData.current.location
        }));
        product.locationData.current.arrivalDate = arrivalDate;
        product.locationData.current.location = newLocation;

        const buffer = Buffer.from(JSON.stringify(product));
        await ctx.stub.putState(productId, buffer);
    }

    @Transaction(false)
    @Returns('Product')
    public async getProduct(ctx: Context, productId: string): Promise<Product> {
        const exists: boolean = await this.productExists(ctx, productId);
        if (!exists) {
            throw new Error(`The product ${productId} does not exist.`);
        }

        return this.readProduct(ctx, productId);
    }

    @Transaction(false)
    @Returns('ProductHistory')
    public async getProductWithHistory(ctx: Context, productId: string): Promise<ProductWithHistory> {
        const exists: boolean = await this.productExists(ctx, productId);
        if (!exists) {
            throw new Error(`The product ${productId} does not exist.`);
        }

        const product = await this.readProduct(ctx, productId);
        const productWithHistory = new ProductWithHistory(product);
        productWithHistory.componentProducts = [];

        for (const childProductId of product.componentProductIds) {
            const childProduct = await this.readProduct(ctx, childProductId);
            productWithHistory.componentProducts.push(childProduct);
        }

        return productWithHistory;
    }

    private async readProduct(ctx: Context, productId: string): Promise<Product> {
        const data = await ctx.stub.getState(productId);
        const product = JSON.parse(data.toString()) as Product;

        return product;
    }

    private requireField(value: string | number, fieldName: string) {
        if (!value) {
            throw new Error(`The '${fieldName}' field is required.`);
        }
    }
}
