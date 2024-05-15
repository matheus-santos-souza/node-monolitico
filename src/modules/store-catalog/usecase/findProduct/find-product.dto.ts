export interface IFindProductInputDto {
    productId: string
}

export interface IFindProductOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}