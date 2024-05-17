import { Invoice } from "../domain/entity/invoice.entity";

export interface IInvoiceGateway {
    generate(invoice: Invoice): Promise<Invoice>;
    find(id: string): Promise<Invoice>
}