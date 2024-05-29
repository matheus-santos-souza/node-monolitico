import { OrderRepository } from "src/modules/checkout/repository/order.repository";
import { PlaceOrderUseCase } from "../place-order.usecase";
import { StoreCatalogFacadeFactory } from "src/modules/store-catalog/factory/facade.factory";
import { InvoiceFacadeFactory } from "src/modules/invoice/factory/invoice.facade.factory";
import { PaymentFacadeFactory } from "src/modules/payment/factory/payment.facade.factory";
import { ClientAdmFacadeFactory } from "src/modules/client-adm/factory/client-adm.factory";
import { ProductAdmFacadeFactory } from "src/modules/product-adm/factory/product-adm.facade.factory";

export class PlaceOrderUseCaseFactory {
    static create() {
        const clientAdmFacade = ClientAdmFacadeFactory.create()
        const productAdmFacade = ProductAdmFacadeFactory.create()
        const storeCatalogFacade = StoreCatalogFacadeFactory.create()
        const invoiceFacade = InvoiceFacadeFactory.create()
        const paymentFacade = PaymentFacadeFactory.create()

        const placeOrderUseCase = new PlaceOrderUseCase(
            new OrderRepository(),
            clientAdmFacade,
            productAdmFacade,
            storeCatalogFacade,
            invoiceFacade,
            paymentFacade
        )
        return placeOrderUseCase
    }
}