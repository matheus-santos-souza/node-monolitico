import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Invoice } from "../../domain/entity/invoice.entity";
import { IInvoiceGateway } from "../../gateway/invoice.gateway";
import { InvoiceItem } from "../../domain/entity/invoice-item.entity";
import { Address } from "../../domain/value-object/address.value-object";
import { IFindInvoiceUseCaseInputDTO } from "./find-invoice.dto";
import { FindInvoiceUseCase } from "./find-invoice.usecase";

class InvoiceRepositoryMock implements IInvoiceGateway {
    generate = jest.fn();
    find = jest.fn();
}

describe("FindInvoiceUseCase unit tests", () => {
    let invoiceRepository: InvoiceRepositoryMock;
    let item1: InvoiceItem;
    let item2: InvoiceItem;
    let address: Address

    beforeEach(() => {
        invoiceRepository = new InvoiceRepositoryMock();

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

    it("should generate a invoice items", async () => {
        const invoiceMock = new Invoice({
            id: new Id("1"),
            document: "Document 1",
            name: "Invoice 1",
            address: address,
            items: [item1, item2]
        })
        invoiceRepository.find.mockResolvedValue(invoiceMock);
        const useCase = new FindInvoiceUseCase(invoiceRepository);

        const input: IFindInvoiceUseCaseInputDTO = {
            id: invoiceMock.id.id
        }

        const output = await useCase.execute(input)

        const expectedTotal = item1.price + item2.price
        expect(output.total).toBe(expectedTotal)
        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(output.id).toBe(invoiceMock.id.id);
        expect(output.name).toBe(invoiceMock.name);
        expect(output.document).toBe(invoiceMock.document);
        expect(output.items.length).toBe(invoiceMock.items.length);
        expect(output.address.city).toBe(invoiceMock.address.city);
        expect(output.address.complement).toBe(invoiceMock.address.complement);
        expect(output.address.number).toBe(invoiceMock.address.number);
        expect(output.address.state).toBe(invoiceMock.address.state);
        expect(output.address.street).toBe(invoiceMock.address.street);
        expect(output.address.zipCode).toBe(invoiceMock.address.zipCode);
        expect(output.createdAt).toStrictEqual(invoiceMock.createdAt);
    })
})