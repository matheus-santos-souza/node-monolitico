import { IProductGateway } from "../../gateway/product.gateway.interface";
import { IFindStockInputDto, IFindStockOutputDto } from "./find-stock.dto";

export class FindStockUseCase {
    constructor(
        private readonly productRepository: IProductGateway
    ) {}

    async execute(input: IFindStockInputDto): Promise<IFindStockOutputDto> {
        const product = await this.productRepository.find(input.productId)

        if (!product) {
            throw new Error(`Product id ${input.productId} not exists!`)
        }

        return {
            id: product.id.id,
            stock: product.stock
        }
    }
}