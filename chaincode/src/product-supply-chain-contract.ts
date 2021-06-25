/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Product } from './models/product';
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
    public async createProduct(ctx: Context, product: Product): Promise<void> {
        return null;
    }

    @Transaction(false)
    @Returns('Product')
    public async getProduct(ctx: Context, productId: string): Promise<Product> {
        return new Product();
    }

    @Transaction(false)
    @Returns('ProductHistory')
    public async getProductWithHistory(ctx: Context, productId: string): Promise<ProductWithHistory> {
        return new ProductWithHistory();
    }

    @Transaction()
    public async shipProductTo(ctx: Context, productId: string, newLocation: string, arrivalDate: string): Promise<void> {
        return null;
    }
}
