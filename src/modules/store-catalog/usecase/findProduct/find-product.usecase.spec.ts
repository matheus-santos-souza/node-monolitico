import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { IProductGateway } from "../../gateway/product.gateway";
import { IFindProductInputDto } from "./find-product.dto";
import { FindProductUseCase } from "./find-product.usecase";

class ProductRepositoryMock implements IProductGateway {
    find = jest.fn();
    findAll = jest.fn();
}

describe("FindProductUseCase unit test", () => {
    let productRepository: ProductRepositoryMock;

    beforeEach(() => {
        productRepository = new ProductRepositoryMock();
    });
    
    it("should find all products", async () => {
        const product = new Product({
            id: new Id("1"),
            description: "Description 1",
            name: "Product 1",
            salesPrice: 10
        })
        productRepository.find.mockResolvedValue(product)
        const useCase = new FindProductUseCase(productRepository)
        const input: IFindProductInputDto = {
            productId: product.id.id
        }
        const output = await useCase.execute(input)

        expect(productRepository.find).toHaveBeenCalled();
        expect(output.id).toBe(product.id.id)
        expect(output.name).toBe(product.name)
        expect(output.description).toBe(product.description)
        expect(output.salesPrice).toBe(product.salesPrice)
    })
})