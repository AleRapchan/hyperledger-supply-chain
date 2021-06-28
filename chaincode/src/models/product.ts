import { Object as FabricObject, Property } from 'fabric-contract-api';
import { ProductLocationData } from './product-location-data';

@FabricObject()
export class Product {
    @Property()
    id: string;

    @Property()
    componentProductIds: string[];

    @Property()
    barcode: string;

    @Property()
    name: string;

    @Property()
    placeOfOrigin: string;

    @Property()
    productionDate: string;

    @Property()
    expirationDate: string;

    @Property()
    unitQuantity: number;

    @Property()
    unitQuantityType: string;

    @Property()
    batchQuantity: number;

    @Property()
    unitPrice: string;

    @Property()
    category: string;

    @Property()
    variety: string;

    @Property()
    misc: object;

    @Property()
    locationData: ProductLocationData;
}