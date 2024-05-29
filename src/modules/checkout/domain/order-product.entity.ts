import { Id } from "src/modules/@shared/domain/value-object/id.value-object"
import { BaseEntity } from "src/modules/@shared/domain/entity/base.entity";

type TOrderProductProps = {
    id?: Id;
    productId: string;
    name: string;
    salesPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class OrderProduct extends BaseEntity {
    private _productId: string;
    private _name: string;
    private _salesPrice: number;

    constructor(props: TOrderProductProps) {
        super(props.id, props.createdAt, props.updatedAt)
        this._productId = props.productId;
        this._name = props.name;
        this._salesPrice = props.salesPrice
    }

    get productId(): string {
        return this._productId
    }

    get name(): string {
        return this._name
    }

    get salesPrice(): number {
        return this._salesPrice
    }
}