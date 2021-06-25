import { Object, Property } from 'fabric-contract-api';
import { Product } from './product';

@Object()
export class ProductWithHistory extends Product {
    @Property()
    componentProducts: ProductWithHistory[];
}
