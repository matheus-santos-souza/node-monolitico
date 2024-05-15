export interface IAddClientFacadeInputDto {
    name: string;
    email: string;
    address: string;
}

export interface IAddClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
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
    address: string;
    createdAt: Date;
    updatedAt: Date;
}