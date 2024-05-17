import { InvoiceFacade } from "../facade/invoice.facade";
import { InvoiceRepository } from "../repository/invoice.repository";
import { FindInvoiceUseCase } from "../usecase/find-invoice/find-invoice.usecase";
import { GenerateInvoiceUseCase } from "../usecase/generate-invoice/generate-invoice.usecase";

export class InvoiceFacadeFactory {
    static create(): InvoiceFacade {
        const invoiceRepository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
        const invoiceFacade = new InvoiceFacade(
            generateInvoiceUseCase,
            findInvoiceUseCase
        )
        return invoiceFacade
    }
}