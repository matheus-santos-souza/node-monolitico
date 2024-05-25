import Address from "src/modules/@shared/domain/value-object/address.value-object";

export interface IFindClientInputDto {
    clientId: string;
}

export interface IFindClientOutputDto {
    id: string;
    name: string;
    email: string;
    document: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}