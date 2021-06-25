import { Object, Property } from 'fabric-contract-api';
import { ProductLocationEntry } from './product-location-entry';

@Object()
export class ProductLocationData {
    @Property()
    previous: ProductLocationEntry[];

    @Property()
    current: ProductLocationEntry;
}