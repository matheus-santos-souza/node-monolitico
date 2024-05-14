import { UUID, randomUUID } from "crypto";
import { IValueObject } from "./value-object.interface";

export class Id implements IValueObject {
    private _id: UUID

    constructor(id?: UUID) {
        this._id = id || randomUUID();
    }

    get id(): UUID {
        return this._id
    }
}