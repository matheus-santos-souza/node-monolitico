import { IProductGateway } from "../../gateway/product.gateway.interface"
import { IAddProductInputDto } from "./add-product.dto"
import { AddProductUseCase } from "./add-product.usecase"

describe("AddProductUseCase unit test", () => {
    let mockRepository: () => IProductGateway

    beforeEach(() => {
        mockRepository = () => {
            return {
                add: jest.fn(),
                find: jest.fn()
            }
        }
    })

    it("should add a product", async () => {
        //repository
        const productRepository = mockRepository();
        jest.spyOn(productRepository, "add")
            .mockImplementation(() => undefined)
        //usecase
        const useCase = new AddProductUseCase(productRepository)
        //input
        const input: IAddProductInputDto = {
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 100,
            stock: 10
        }
        //output
        const output = await useCase.execute(input)

        expect(productRepository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.purchasePrice).toBe(input.purchasePrice);
        expect(output.stock).toBe(input.stock)
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    })
})