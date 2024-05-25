import { IAggregateRoot } from "src/modules/@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "src/modules/@shared/domain/entity/base.entity";
import Address from "src/modules/@shared/domain/value-object/address.value-object";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object"

type TClientProps = {
    id?: Id;
    name: string;
    email: string;
    document: string;
    address: Address;
}

export class Client extends BaseEntity implements IAggregateRoot {
    private _name: string;
    private _email: string;
    private _document: string;
    private _address: Address;

    constructor(props: TClientProps) {
        super(props.id)
        this._name = props.name;
        this._email = props.email;
        this._document = props.document;
        this._address = props.address;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }
}