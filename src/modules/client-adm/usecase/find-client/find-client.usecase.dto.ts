export interface IFindClientInputDto {
    clientId: string;
}

export interface IFindClientOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}