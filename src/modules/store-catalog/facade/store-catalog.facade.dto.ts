export interface IFindStoreFacadeInputDto {
    productId: string
}

export interface IFindStoreFacadeOutputDto {
    id: string
    name: string;
    description: string
    salesPrice: number
}

export interface IFindAllStoreCatalogFacadeInputDto {}

type TProduct = {
    id: string
    name: string;
    description: string
    salesPrice: number
}

export interface IFindAllStoreCatalogFacadeOutputDto {
    products: TProduct[]
}