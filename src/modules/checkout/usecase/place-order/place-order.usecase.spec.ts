import { PlaceOrderUseCase } from "./place-order.usecase";
import { ICheckoutGateway } from "../../gateway/checkout.gateway";
import { IPlaceOrderInputDto } from "./place-order.dto";
import { IClientAdmFacade } from "src/modules/client-adm/facade/client-adm.facade.interface";
import { IProductAdmFacade } from "src/modules/product-adm/facade/product-adm.facade.interface";
import { IStoreCatalogFacade } from "src/modules/store-catalog/facade/store-catalog.facade.interface";
import { Product } from "../../domain/product.entity";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { IPaymentFacade } from "src/modules/payment/facade/payment.facade.interface";
import { IInvoiceFacade } from "src/modules/invoice/facade/invoice.facade.interface";
import Address from "src/modules/@shared/domain/value-object/address.value-object";

class CheckoutRepositoryMock implements ICheckoutGateway {
    addOrder: jest.MockedFunction<ICheckoutGateway['addOrder']> = jest.fn().mockResolvedValue(null)
    findOrder: jest.MockedFunction<ICheckoutGateway['findOrder']> = jest.fn()
}

class ClientAdmFacadeMock implements IClientAdmFacade {
    add: jest.MockedFunction<IClientAdmFacade['add']> = jest.fn()
    find: jest.MockedFunction<IClientAdmFacade['find']> = jest.fn()
}

class ProductAdmFacadeMock implements IProductAdmFacade {
    addProduct: jest.MockedFunction<IProductAdmFacade['addProduct']> = jest.fn().mockResolvedValue(null);
    checkStock: jest.MockedFunction<IProductAdmFacade['checkStock']> = jest.fn();
}

class StoreCatalogFacadeMock implements IStoreCatalogFacade {
    find: jest.MockedFunction<IStoreCatalogFacade['find']> = jest.fn()
    findAll: jest.MockedFunction<IStoreCatalogFacade['findAll']> = jest.fn()
}

class PaymentFacadeMock implements IPaymentFacade {
    process: jest.MockedFunction<IPaymentFacade['process']> = jest.fn()
}

class InvoiceFacadeMock implements IInvoiceFacade {
    generate: jest.MockedFunction<IInvoiceFacade['generate']> = jest.fn()
    find: jest.MockedFunction<IInvoiceFacade['find']> = jest.fn() 
}

describe("PlaceOrderUseCase unit tests", () => {
    
    describe("execute method", () => {
        let clientAdmFacade: ClientAdmFacadeMock;

        beforeEach(() => {
            clientAdmFacade = new ClientAdmFacadeMock();
        })

        it("should throw an erro when client not found", async () => {
            clientAdmFacade.find.mockResolvedValue(null)
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientAdmFacade
            placeOrderUseCase["clientAdmFacade"] = clientAdmFacade;

            const input: IPlaceOrderInputDto = {
                clientId: "0",
                products: []
            }

            expect(async () => await placeOrderUseCase.execute(input))
                .rejects.toThrow(new Error("Client not found!"))
        });

        it("should throw an error products are not valid", async () => {
            clientAdmFacade.find.mockResolvedValue(true as unknown as any)
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientAdmFacade
            placeOrderUseCase["clientAdmFacade"] = clientAdmFacade;
            
            const mockValidateProducts = jest
            //@ts-expect-error - spy on priavate method
            .spyOn(placeOrderUseCase, "validateProducts")
            //@ts-expect-error - force set clientAdmFacade
            .mockRejectedValue(new Error("No products selected"));

            const input: IPlaceOrderInputDto = {
                clientId: "1",
                products: []
            }

            await expect(placeOrderUseCase.execute(input))
                .rejects.toThrow(new Error("No products selected"))
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        })
    })

    describe("validateProducts method", () => {
        let productAdmFacade: ProductAdmFacadeMock;

        beforeEach(() => {
            productAdmFacade = new ProductAdmFacadeMock();
        })

        it("should throw error if no products are selected", async () => {
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();

            const input: IPlaceOrderInputDto = {
                clientId: "1",
                products: []
            }

            await expect(placeOrderUseCase["validateProducts"](input))
                .rejects.toThrow(new Error("No products selected"))
        })

        it("should throw error if no products is out of stock", async () => {
            productAdmFacade.checkStock = jest.fn(({ productId }: { productId: string }) => {
                return Promise.resolve({
                    productId,
                    stock: productId === "1" ? 0 : 1
                })
            })
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientAdmFacade
            placeOrderUseCase["productAdmFacade"] = productAdmFacade;

            const input: IPlaceOrderInputDto = {
                clientId: "0",
                products: [{ productId: "1" }]
            }
            await expect(placeOrderUseCase["validateProducts"](input))
                .rejects.toThrow(new Error("Product 1 is not available in stock"))

            input.products.unshift({ productId: "0" })
            await expect(placeOrderUseCase["validateProducts"](input))
                .rejects.toThrow(new Error("Product 1 is not available in stock"));
            expect(productAdmFacade.checkStock).toHaveBeenCalledTimes(3);

            input.products.push({ productId: "2" })
            await expect(placeOrderUseCase["validateProducts"](input))
                .rejects.toThrow(new Error("Product 1 is not available in stock"));
            expect(productAdmFacade.checkStock).toHaveBeenCalledTimes(5);
        })
    })

    describe("get products method", () => {
        let storeCatalogFacade: StoreCatalogFacadeMock
        const mockDate = new Date(2000, 1, 1)

        beforeEach(() => {
            storeCatalogFacade = new StoreCatalogFacadeMock();
        })

        beforeAll(() => {
            jest.useFakeTimers({})
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers();
        })

        it("should throw an error when product not found", async () => {
            storeCatalogFacade.find.mockResolvedValue(null);
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set storeCatalogFacade
            placeOrderUseCase["storeCatalogFacade"] = storeCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0"))
                .rejects.toThrow(new Error("Product not found"))
        })

        it("should return a product", async () => {
            storeCatalogFacade.find.mockResolvedValue({
                id: "0",
                name: "Product 0",
                description: "Description 0",
                salesPrice: 0
            })

            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set storeCatalogFacade
            placeOrderUseCase["storeCatalogFacade"] = storeCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0"))
                .resolves.toStrictEqual(
                    new Product({
                        id: new Id("0"),
                        name: "Product 0",
                        description: "Description 0",
                        salesPrice: 0
                    })
                )
            expect(storeCatalogFacade.find).toHaveBeenCalled()
        })
    }) 

    describe("place an order", () => {    
        let clientAdmFacade: ClientAdmFacadeMock;
        let paymentFacade: PaymentFacadeMock;
        let invoiceFacade: InvoiceFacadeMock;
        let checkoutRepository: CheckoutRepositoryMock;
        let products: {[key: string] : Product}

        beforeEach(() => {
            clientAdmFacade = new ClientAdmFacadeMock();
            paymentFacade = new PaymentFacadeMock();
            checkoutRepository = new CheckoutRepositoryMock();
            invoiceFacade = new InvoiceFacadeMock();

            products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    description: "Description 1",
                    salesPrice: 40
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "Product 2",
                    description: "Description 2",
                    salesPrice: 30
                })
            }
        })

        it("should not be approved", async () => {
            clientAdmFacade.find.mockResolvedValue({
                id: "1c",
                document: "1234-5678",
                address: new Address(
                  "Rua 123",
                  99,
                  "Casa Verde",
                  "Criciúma",
                  "SC",
                  "88888-888",
                ),
                email: "email@email.com",
                name: "Name 1",
                createdAt: new Date(),
                updatedAt: new Date()

            })
            paymentFacade.process.mockResolvedValue({
                transactionId: "1t",
                orderId: "1o",
                amount: 100,
                status: "error",
                createdAt: new Date(),
                updatedAt: new Date()
            })
            const placeOrderUseCase = new PlaceOrderUseCase(
                checkoutRepository,
                clientAdmFacade,
                null,
                null,
                invoiceFacade,
                paymentFacade
            )

            const validateProductsMock = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase, "validateProducts")
            //@ts-expect-error - spy on private method
            .mockResolvedValue(null)

            const getProductMock = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase, "getProduct")
            //@ts-expect-error - spy on private method
            .mockImplementation((productId: keyof typeof products) => {
                return products[productId];
            })

            const input: IPlaceOrderInputDto = {
                clientId: "1c",
                products: [{productId: "1"}, {productId: "2"}]
            }

            const output = await placeOrderUseCase.execute(input);

            expect(output.invoiceId).toBeNull();
            expect(output.total).toBe(70);
            expect(output.products).toEqual([{productId: "1"}, {productId: "2"}])
            expect(clientAdmFacade.find).toHaveBeenCalledTimes(1)
            expect(clientAdmFacade.find).toHaveBeenCalledWith({ clientId: "1c" })
            expect(validateProductsMock).toHaveBeenCalledTimes(1)
            expect(validateProductsMock).toHaveBeenCalledWith(input)
            expect(getProductMock).toHaveBeenCalledTimes(2)
            expect(checkoutRepository.addOrder).toHaveBeenCalledTimes(1)
            expect(paymentFacade.process).toHaveBeenCalledTimes(1)
            expect(paymentFacade.process).toHaveBeenCalledWith({
                orderId: output.id,
                amount: output.total
            })
            expect(invoiceFacade.generate).toHaveBeenCalledTimes(0)
        })

        it("should by approved", async () => {
            const clientProps = {
                id: "1c",
                document: "1234-5678",
                address: new Address(
                  "Rua 123",
                  99,
                  "Casa Verde",
                  "Criciúma",
                  "SC",
                  "88888-888",
                ),
                email: "email@email.com",
                name: "Name 1",
                createdAt: new Date(),
                updatedAt: new Date()

            }
            clientAdmFacade.find.mockResolvedValue(clientProps)
            paymentFacade.process.mockResolvedValue({
                transactionId: "1t",
                orderId: "1o",
                amount: 100,
                status: "approved",
                createdAt: new Date(),
                updatedAt: new Date()
            })
            invoiceFacade.generate.mockResolvedValue({
                id: "1i",
                total: 100,
                name: clientProps.name,
                document: clientProps.document,
                street: clientProps.address.street,
                number: clientProps.address.number,
                complement: clientProps.address.complement,
                city: clientProps.address.city,
                state: clientProps.address.state,
                zipCode: clientProps.address.zipCode,
                items: [
                    {
                        id: products["1"].id.id,
                        name: products["1"].name,
                        price: products["1"].salesPrice,
                    },
                    {
                        id: products["2"].id.id,
                        name: products["2"].name,
                        price: products["2"].salesPrice,
                    }
                ]
            })
            const placeOrderUseCase = new PlaceOrderUseCase(
                checkoutRepository,
                clientAdmFacade,
                null,
                null,
                invoiceFacade,
                paymentFacade
            )

            const validateProductsMock = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase, "validateProducts")
            //@ts-expect-error - spy on private method
            .mockResolvedValue(null)

            const getProductMock = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase, "getProduct")
            //@ts-expect-error - spy on private method
            .mockImplementation((productId: keyof typeof products) => {
                return products[productId];
            })


            const input: IPlaceOrderInputDto = {
                clientId: "1c",
                products: [{productId: "1"}, {productId: "2"}]
            }

            const output = await placeOrderUseCase.execute(input);

            expect(output.invoiceId).toBe("1i")
            expect(output.total).toBe(70);
            expect(output.products).toEqual([{productId: "1"}, {productId: "2"}])
            expect(clientAdmFacade.find).toHaveBeenCalledTimes(1)
            expect(clientAdmFacade.find).toHaveBeenCalledWith({ clientId: "1c" })
            expect(validateProductsMock).toHaveBeenCalledTimes(1)
            expect(validateProductsMock).toHaveBeenCalledWith(input)
            expect(getProductMock).toHaveBeenCalledTimes(2)
            expect(checkoutRepository.addOrder).toHaveBeenCalledTimes(1)
            expect(paymentFacade.process).toHaveBeenCalledTimes(1)
            expect(paymentFacade.process).toHaveBeenCalledWith({
                orderId: output.id,
                amount: output.total
            })
            expect(invoiceFacade.generate).toHaveBeenCalledTimes(1)
            expect(invoiceFacade.generate).toHaveBeenCalledWith({
                name: clientProps.name,
                document: clientProps.document,
                street: clientProps.address.street,
                number: clientProps.address.number,
                complement: clientProps.address.complement,
                city: clientProps.address.city,
                state: clientProps.address.state,
                zipCode: clientProps.address.zipCode,
                items: [
                    {
                        id: products["1"].id.id,
                        name: products["1"].name,
                        price: products["1"].salesPrice,
                    },
                    {
                        id: products["2"].id.id,
                        name: products["2"].name,
                        price: products["2"].salesPrice,
                    }
                ]
            })
        })
    })
})