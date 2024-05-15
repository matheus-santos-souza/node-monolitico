import { StoreCatalogeFacade } from "../facade/store-catalog.facade";
import { ProductRepository } from "../repository/product.repository";
import { FindAllProductsUseCase } from "../usecase/findAllProducts/find-all-products.usecase";
import { FindProductUseCase } from "../usecase/findProduct/find-product.usecase";

export class StoreCatalogFacadeFactory {
    static create(): StoreCatalogeFacade {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository)
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository)
        const storeCatalogeFacade = new StoreCatalogeFacade(
            findProductUseCase,
            findAllProductsUseCase
        )
        return storeCatalogeFacade
    }
}