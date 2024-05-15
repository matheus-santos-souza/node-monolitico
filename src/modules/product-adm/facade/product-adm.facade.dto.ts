export interface IAddProductFacadeInputDto {
    id?: string,
    name: string
    description: string
    purchasePrice: number
    stock: number
}

export interface ICheckProductFacadeInputDto {
    productId: string
}

export interface ICheckProductFacadeOutputDto {
    productId: string;
    stock: number;
}