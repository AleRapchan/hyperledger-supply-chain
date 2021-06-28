import { Object as FabricObject, Property } from 'fabric-contract-api';

@FabricObject()
export class ProductLocationEntry {
    constructor(obj?: Partial<ProductLocationEntry>) {
        Object.assign(this, obj);
    }

    @Property()
    location: string;

    @Property()
    arrivalDate: string;
}