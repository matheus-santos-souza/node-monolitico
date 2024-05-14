import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { IProductGateway } from "../../gateway/product.gateway.interface";
import { IAddProductInputDto, IAddProductOutputDto } from "./add-product.dto";

export class AddProductUseCase {
    constructor(
        private readonly productRepository: IProductGateway
    ) {}
    async execute(input: IAddProductInputDto): Promise<IAddProductOutputDto> {
        try {
            const product = new Product({
                id: new Id(input.id),
                name: input.name,
                description: input.description,
                purchasePrice: input.purchasePrice,
                stock: input.stock
            })
    
            await this.productRepository.add(product) 
            return {
                id: product.id.id,
                name: product.name,
                description: product.description,
                purchasePrice: product.purchasePrice,
                stock: product.stock,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }
        } catch (error) {
            throw new Error(error)
        }
        
    }
}