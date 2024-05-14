import { randomUUID } from "crypto";
import { IValueObject } from "./value-object.interface";

export class Id implements IValueObject {
    private _id: string

    constructor(id?: string) {
        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id
    }
}