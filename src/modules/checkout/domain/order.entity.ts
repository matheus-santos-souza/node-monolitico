import { Id } from "src/modules/@shared/domain/value-object/id.value-object"
import { Client } from "./client.entity";
import { Product } from "./product.entity";
import { BaseEntity } from "src/modules/@shared/domain/entity/base.entity";

type TOrderProps = {
    id?: Id;
    client: Client;
    products: Product[];
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Order extends BaseEntity {
    private _client: Client;
    private _products: Product[];
    private _status?: string;

    constructor(props: TOrderProps) {
        super(props.id, props.createdAt, props.updatedAt)
        this._client = props.client;
        this._products = props.products;
        this._status = props.status || "pending";
    }

    approved(): void {
        this._status = "approved"
    }

    get client(): Client {
        return this._client
    }

    get products(): Product[] {
        return this._products
    }

    get status(): string {
        return this._status
    }

    get total(): number {
        return this._products.reduce((total, product) => {
            return total + product.salesPrice;
        }, 0)
    }
}