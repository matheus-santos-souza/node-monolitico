import { IAggregateRoot } from "src/modules/@shared/domain/entity/aggregate-root.interface"
import { BaseEntity } from "src/modules/@shared/domain/entity/base.entity"
import { Id } from "src/modules/@shared/domain/value-object/id.value-object"

type TInvoiceItems = {
    id?: Id
    name: string
    price: number
}

export class InvoiceItem extends BaseEntity implements IAggregateRoot {
    private _name: string;
    private _price: number;

    constructor(props: TInvoiceItems) {
        super(props.id)
        this._name = props.name;
        this._price = props.price
        this.validate()
    }

    validate(): void {
        if (this.price <= 0) {
            throw new Error(`Price cannot be less than 0!`)
        }
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}