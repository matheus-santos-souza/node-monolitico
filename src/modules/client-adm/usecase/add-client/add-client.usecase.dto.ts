import Address from "src/modules/@shared/domain/value-object/address.value-object";

export interface IAddClientInputDto {
    id?: string;
    name: string;
    email: string;
    document: string;
    address: Address;
}

export interface IAddClientOutputDto {
    id: string;
    name: string;
    email: string;
    document: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}