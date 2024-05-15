import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { IProductGateway } from "../../gateway/product.gateway"
import { FindAllProductsUseCase } from "./find-all-products.usecase";

class ProductRepositoryMock implements IProductGateway {
    find = jest.fn();
    findAll = jest.fn();
}

describe("FindAllProductsUseCase unit tests",() => {
    let productRepository: ProductRepositoryMock;

    beforeEach(() => {
        productRepository = new ProductRepositoryMock();
    });

    it("should find all products", async () => {
        const product1 = new Product({
            id: new Id("1"),
            description: "Description 1",
            name: "Product 1",
            salesPrice: 10
        })

        const product2 = new Product({
            id: new Id("2"),
            description: "Description 2",
            name: "Product 2",
            salesPrice: 20
        })
        productRepository.findAll.mockResolvedValue([product1, product2])
        const useCase = new FindAllProductsUseCase(productRepository)
        const output = await useCase.execute({})

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[0].description).toBe(product1.description)
        expect(output.products[0].salesPrice).toBe(product1.salesPrice)
        expect(output.products[1].id).toBe(product2.id.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].description).toBe(product2.description)
        expect(output.products[1].salesPrice).toBe(product2.salesPrice)
    })

})