import { IUseCase } from "src/modules/@shared/usecase/use-case.interface";
import { IFindAllProductsInputDto, IFindAllProductsOutputDto } from "./find-all-products.dto";
import { IProductGateway } from "../../gateway/product.gateway";

export class FindAllProductsUseCase implements IUseCase<IFindAllProductsInputDto, IFindAllProductsOutputDto> {
    constructor(
        private readonly productRepository: IProductGateway,
    ) {}

    async execute(input: IFindAllProductsInputDto): Promise<IFindAllProductsOutputDto> {
        const products = await this.productRepository.findAll();
        return {
            products: products.map((product) => {
                return {
                    id: product.id.id,
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice
                }
            })
        }
    }

}