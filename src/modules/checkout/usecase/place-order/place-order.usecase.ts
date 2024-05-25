import { IUseCase } from "src/modules/@shared/usecase/use-case.interface";
import { IPlaceOrderInputDto, IPlaceOrderOutputDto } from "./place-order.dto";
import { ICheckoutGateway } from "../../gateway/checkout.gateway";
import { IClientAdmFacade } from "src/modules/client-adm/facade/client-adm.facade.interface";
import { IProductAdmFacade } from "src/modules/product-adm/facade/product-adm.facade.interface";
import { IStoreCatalogFacade } from "src/modules/store-catalog/facade/store-catalog.facade.interface";
import { Product } from "../../domain/product.entity";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { Order } from "../../domain/order.entity";
import { IPaymentFacade } from "src/modules/payment/facade/payment.facade.interface";
import { IInvoiceFacade } from "src/modules/invoice/facade/invoice.facade.interface";

export class PlaceOrderUseCase implements IUseCase<IPlaceOrderInputDto, IPlaceOrderOutputDto> {
    constructor(
        private readonly checkoutRepository: ICheckoutGateway,
        private readonly clientAdmFacade: IClientAdmFacade,
        private readonly productAdmFacade: IProductAdmFacade,
        private readonly storeCatalogFacade: IStoreCatalogFacade,
        private readonly invoiceFacade: IInvoiceFacade,
        private readonly paymentFacade: IPaymentFacade
    ) {}

    async execute(input: IPlaceOrderInputDto): Promise<IPlaceOrderOutputDto> {
        const client = await this.clientAdmFacade.find({ clientId: input.clientId })
        if (!client) {
            throw new Error("Client not found!")
        }

        await this.validateProducts(input);

        const products = await Promise.all(
            input.products.map(product => this.getProduct(product.productId))
        )

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            document: client.document,
            address: client.address,
            email: client.email
        })

        const order = new Order({
            client: myClient,
            products
        })

        const payment = await this.paymentFacade.process({
            orderId: order.id.id,
            amount: order.total
        })

        const invoice = 
            payment.status === "approved" ? 
                await this.invoiceFacade.generate({
                    name: client.name,
                    document: client.document,
                    complement: client.address.complement,
                    city: client.address.city,
                    number: client.address.number,
                    state: client.address.state,
                    street: client.address.street,
                    zipCode: client.address.zipCode,
                    items: products.map(product => {
                        return {
                            id: product.id.id,
                            name: product.name,
                            price: product.salesPrice
                        }
                    }),
                }) : null
        
        payment.status === "approved" && order.approved();
        await this.checkoutRepository.addOrder(order);

        return {
            id: order.id.id,
            invoiceId: payment.status === "approved" ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map(product => {
                return {
                    productId: product.id.id
                }
            }),
        }
    }

    private async validateProducts(input: IPlaceOrderInputDto): Promise<void> {
        if (!input.products.length) {
            throw new Error("No products selected")
        }

        for (const item of input.products) {
            const product = await this.productAdmFacade.checkStock({
                productId: item.productId
            })
            if (product.stock <= 0) {
                throw new Error(`Product ${product.productId} is not available in stock`)
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this.storeCatalogFacade.find({ productId })
        if (!product) {
            throw new Error("Product not found")
        }
        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        })
    }
}