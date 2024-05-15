export interface IFindAllProductsInputDto {}

type Product = {
    id: string
    name: string
    description: string
    salesPrice: number
}

export interface IFindAllProductsOutputDto {
    products: Product[]
}