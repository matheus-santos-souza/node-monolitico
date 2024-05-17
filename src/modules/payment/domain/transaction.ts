import { IAggregateRoot } from "src/modules/@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "src/modules/@shared/domain/entity/base.entity";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object"

type TTransactionProps = {
    id?: Id;
    amount: number;
    orderId: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Transaction extends BaseEntity implements IAggregateRoot {
    private _amount: number;
    private _orderId: string;
    private _status?: string;

    constructor(props: TTransactionProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._amount = props.amount;
        this._orderId = props.orderId;
        this._status = props.status || "pending";
        this.validate();
    }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error(`Amount must be grater than 0!`)
        }
    }

    approve(): void {
        this._status = "approved";
    }

    decline(): void {
        this._status = "declined";
    }

    process(): void {
        if (this._amount >= 20) {
            this.approve();
        } else {
            this.decline();
        }
    }

    get amount(): number {
        return this._amount
    }

    get orderId(): string {
        return this._orderId
    }

    get status(): string {
        return this._status
    }
}