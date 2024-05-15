import { Id } from "../../../@shared/domain/value-object/id.value-object"
import { Product } from "../../domain/product.entity"
import { IProductGateway } from "../../gateway/product.gateway.interface"
import { IFindStockInputDto } from "./find-stock.dto"
import { FindStockUseCase } from "./find-stock.usecase"

describe("FindStockUseCase unit test", () => {
    let mockRepository: () => IProductGateway

    beforeEach(() => {
        mockRepository = () => {
            return {
                add: jest.fn(),
                find: jest.fn()
            }
        }
    })

    it("should find stock", async () => {
        const productRepository = mockRepository();
        const productMock = new Product({
            id: new Id("123"),
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 100,
            stock: 10,
        })
        jest.spyOn(productRepository, "find")
            .mockImplementation(() => Promise.resolve(productMock))

        const useCase = new FindStockUseCase(productRepository);

        const input: IFindStockInputDto = {
            productId: productMock.id.id
        }

        const output = await useCase.execute(input)

        expect(output.id).toBe(productMock.id.id)
        expect(output.stock).toBe(productMock.stock)
    })
})