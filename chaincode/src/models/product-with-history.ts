import { Object as FabricObject, Property } from 'fabric-contract-api';
import { Product } from './product';

@FabricObject()
export class ProductWithHistory extends Product {
    constructor(product?: Product) {
        super();
        Object.assign(this, product);
    }

    @Property('componentProducts', 'Array<Product>')
    componentProducts: Product[];
}
