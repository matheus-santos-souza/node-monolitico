import { IUseCase } from "src/modules/@shared/usecase/use-case.interface";
import { IFindProductInputDto, IFindProductOutputDto } from "./find-product.dto";
import { IProductGateway } from "../../gateway/product.gateway";

export class FindProductUseCase implements IUseCase<IFindProductInputDto, IFindProductOutputDto> {
    constructor(
        private readonly productRepository: IProductGateway
    ) {}

    async execute(input: IFindProductInputDto): Promise<IFindProductOutputDto> {
        const product = await this.productRepository.find(input.productId);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
    }
}