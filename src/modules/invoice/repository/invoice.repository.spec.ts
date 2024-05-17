import { Sequelize } from "sequelize-typescript";
import { InvoiceItemModel } from "./invoice-tem.model";
import { InvoiceModel } from "./invoice.model";
import { InvoiceRepository } from "./invoice.repository";
import { InvoiceItem } from "../domain/entity/invoice-item.entity";
import { Address } from "../domain/value-object/address.value-object";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Invoice } from "../domain/entity/invoice.entity";

describe("InvoiceRepository test", () => {
    let sequelize!: Sequelize;
    let item1: InvoiceItem;
    let item2: InvoiceItem;
    let address: Address

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync({ force: true });

        item1 = new InvoiceItem({
            id: new Id("1"),
            name: "Item 1",
            price: 10
        })

        item2 = new InvoiceItem({
            id: new Id("2"),
            name: "Item 2",
            price: 20
        })

        address = new Address({
            city: "City 1",
            complement: "Complement 1",
            number: 100,
            state: "State 1",
            street: "Street 1",
            zipCode: "12345678"
        })
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should generate invoice items", async () => {
        const invoiceRepository = new InvoiceRepository();
        const invoice = new Invoice({
            id: new Id("1"),
            document: "Document 1",
            name: "Invoice 1",
            address: address,
            items: [item1, item2]
        })

        const result = await invoiceRepository.generate(invoice);

        const findInvoice = await InvoiceModel.findOne({
            where: {
                id: invoice.id.id
            },
            include: ["items"]
        })

        const expectedTotal = item1.price + item2.price
        expect(result.total).toBe(expectedTotal)
        expect(findInvoice.id).toBe(result.id.id);
        expect(findInvoice.name).toBe(result.name);
        expect(findInvoice.document).toBe(result.document);
        expect(findInvoice.items.length).toBe(result.items.length);
        expect(findInvoice.city).toBe(result.address.city);
        expect(findInvoice.complement).toBe(result.address.complement);
        expect(findInvoice.number).toBe(result.address.number);
        expect(findInvoice.state).toBe(result.address.state);
        expect(findInvoice.street).toBe(result.address.street);
        expect(findInvoice.zipCode).toBe(result.address.zipCode);
        expect(findInvoice.createdAt).toStrictEqual(result.createdAt);
        expect(findInvoice.updatedAt).toStrictEqual(result.updatedAt);
    })


    it("should find invoice items", async () => {
        const invoiceRepository = new InvoiceRepository();
        const invoice = new Invoice({
            id: new Id("1"),
            document: "Document 1",
            name: "Invoice 1",
            address: address,
            items: [item1, item2]
        })

        const createdInvoice = await InvoiceModel.create(
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

        const findInvoice = await invoiceRepository.find(invoice.id.id)

        const expectedTotal = item1.price + item2.price
        expect(findInvoice.total).toBe(expectedTotal)
        expect(createdInvoice.id).toBe(findInvoice.id.id);
        expect(createdInvoice.name).toBe(findInvoice.name);
        expect(createdInvoice.document).toBe(findInvoice.document);
        expect(createdInvoice.items.length).toBe(findInvoice.items.length);
        expect(createdInvoice.city).toBe(findInvoice.address.city);
        expect(createdInvoice.complement).toBe(findInvoice.address.complement);
        expect(createdInvoice.number).toBe(findInvoice.address.number);
        expect(createdInvoice.state).toBe(findInvoice.address.state);
        expect(createdInvoice.street).toBe(findInvoice.address.street);
        expect(createdInvoice.zipCode).toBe(findInvoice.address.zipCode);
        expect(createdInvoice.createdAt).toStrictEqual(findInvoice.createdAt);
        expect(createdInvoice.updatedAt).toStrictEqual(findInvoice.updatedAt);
    })
})