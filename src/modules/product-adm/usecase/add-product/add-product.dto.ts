export interface IAddProductInputDto {
    id?: string,
    name: string
    description: string
    purchasePrice: number
    stock: number
}

export interface IAddProductOutputDto {
    id: string
    name: string
    description: string
    purchasePrice: number
    stock: number
    createdAt: Date
    updatedAt: Date
}