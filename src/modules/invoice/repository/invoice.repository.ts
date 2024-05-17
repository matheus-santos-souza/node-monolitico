import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Invoice } from "../domain/entity/invoice.entity";
import { IInvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-tem.model";
import { InvoiceModel } from "./invoice.model";
import { Address } from "../domain/value-object/address.value-object";
import { InvoiceItem } from "../domain/entity/invoice-item.entity";

export class InvoiceRepository implements IInvoiceGateway {
    async generate(invoice: Invoice): Promise<Invoice> {
        await InvoiceModel.create(
            {
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                city: invoice.address.city,
                complement: invoice.address.complement,
                number: invoice.address.number,
                state: invoice.address.state,
                street: invoice.address.street,
                zipCode: invoice.address.zipCode,
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
                items: invoice.items.map(item => {
                    return {
                        id: item.id.id,
                        name: item.name,
                        price: item.price,
                        invoice_id: invoice.id.id
                    }
                })
            },
            {
                include: [{ model: InvoiceItemModel }]
            }
        )
        return invoice
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({ 
            where: { id },
            include: [InvoiceItemModel] 
        })

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            address: new Address({
                city: invoice.city,
                complement: invoice.complement,
                number: invoice.number,
                state: invoice.state,
                street: invoice.street,
                zipCode: invoice.zipCode,
            }),
            items: invoice.items.map(item => {
                return new InvoiceItem({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                })
            })
        })
    }
}