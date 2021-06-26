import { Object as FabricObject, Property } from 'fabric-contract-api';
import { Product } from './product';

@FabricObject()
export class ProductWithHistory extends Product {
    @Property()
    componentProducts: ProductWithHistory[];
}
