import { Object as FabricObject, Property } from 'fabric-contract-api';
import { ProductLocationEntry } from './product-location-entry';

@FabricObject()
export class ProductLocationData {
    @Property()
    previous: ProductLocationEntry[];

    @Property()
    current: ProductLocationEntry;
}