import Address from "src/modules/@shared/domain/value-object/address.value-object";

export interface IAddClientFacadeInputDto {
    name: string;
    email: string;
    document: string;
    address: Address;
}

export interface IAddClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    document: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}

export interface IFindClientFacadeInputDto {
    clientId: string;
}

export interface IFindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    document: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}