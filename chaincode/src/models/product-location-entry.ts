import { Object, Property } from 'fabric-contract-api';

@Object()
export class ProductLocationEntry {
    @Property()
    location: string;

    @Property()
    arrivalDate: string;
}