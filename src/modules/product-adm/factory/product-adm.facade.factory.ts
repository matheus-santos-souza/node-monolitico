import { ProductAdmFacade } from "../facade/product-adm.facade";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase";
import { FindStockUseCase } from "../usecase/find-stock/find-stock.usecase";


export class ProductAdmFacadeFactory {
    static create(): ProductAdmFacade {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const findStockUseCase = new FindStockUseCase(productRepository);
        const productAdmFacade = new ProductAdmFacade(
            addProductUseCase,
            findStockUseCase,
        )
        return productAdmFacade
    }
}