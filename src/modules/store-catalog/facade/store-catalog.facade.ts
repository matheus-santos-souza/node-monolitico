import { IFindStoreFacadeOutputDto, IFindAllStoreCatalogFacadeInputDto, IFindAllStoreCatalogFacadeOutputDto, IFindStoreFacadeInputDto } from "./store-catalog.facade.dto";
import { IStoreCatalogFacade } from "./store-catalog.facade.interface";
import { FindProductUseCase } from "../usecase/findProduct/find-product.usecase";
import { FindAllProductsUseCase } from "../usecase/findAllProducts/find-all-products.usecase";

export class StoreCatalogeFacade implements IStoreCatalogFacade {
    constructor(
        private readonly findProductUseCase: FindProductUseCase,
        private readonly findAllProductUseCase: FindAllProductsUseCase
    ) {}

    async find(input: IFindStoreFacadeInputDto): Promise<IFindStoreFacadeOutputDto> {
        return await this.findProductUseCase.execute({ productId: input.productId })

    }

    async findAll(input: IFindAllStoreCatalogFacadeInputDto): Promise<IFindAllStoreCatalogFacadeOutputDto> {
        return await this.findAllProductUseCase.execute({})
    }
    
}