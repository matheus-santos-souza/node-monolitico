import { Id } from "src/modules/@shared/domain/value-object/id.value-object"
import { InvoiceItem } from "./invoice-item.entity"
import { Address } from "../value-object/address.value-object"
import { BaseEntity } from "src/modules/@shared/domain/entity/base.entity"
import { IAggregateRoot } from "src/modules/@shared/domain/entity/aggregate-root.interface"

type TInvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

export class Invoice extends BaseEntity implements IAggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItem[];
    private _total: number = 0;

    constructor(props: TInvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
        this.sumTotal();
    }

    sumTotal(): void {
        this._items.forEach((item) => this._total += item.price);
    }

    get name(): string {
        return this._name
    }

    get document(): string {
        return this._document
    }
    
    get address(): Address {
        return this._address
    }

    get items(): InvoiceItem[] {
        return this._items
    }

    get total(): number {
        return this._total
    }
}