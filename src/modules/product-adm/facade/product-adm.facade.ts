import { IAddProductInputDto } from "../usecase/add-product/add-product.dto"
import { IFindStockInputDto } from "../usecase/find-stock/find-stock.dto"
import { IAddProductFacadeInputDto, ICheckProductFacadeInputDto, ICheckProductFacadeOutputDto } from "./product-adm.facade.dto"
import { IProductAdmFacade } from "./product-adm.facade.interface"
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase"
import { FindStockUseCase } from "../usecase/find-stock/find-stock.usecase"



export class ProductAdmFacade implements IProductAdmFacade {
    constructor(
        private readonly addUseCase: AddProductUseCase,
        private readonly stockUseCase: FindStockUseCase
    ) {}

    async addProduct(input: IAddProductFacadeInputDto): Promise<void> {
        const addProductInputDto: IAddProductInputDto = {
            id: input.id,
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
        }
        await this.addUseCase.execute(addProductInputDto)
    }

    async checkStock(input: ICheckProductFacadeInputDto): Promise<ICheckProductFacadeOutputDto> {
        const findStockInputDto: IFindStockInputDto = {
            productId: input.productId
        }
        const result = await this.stockUseCase.execute(findStockInputDto)
        return {
            productId: result.id,
            stock: result.stock
        }
    }
}