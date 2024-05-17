import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Invoice } from "../../domain/entity/invoice.entity";
import { IInvoiceGateway } from "../../gateway/invoice.gateway";
import { InvoiceItem } from "../../domain/entity/invoice-item.entity";
import { Address } from "../../domain/value-object/address.value-object";
import { IGenerateInvoiceUseCaseInputDto } from "./generate-invoice.dto";
import { GenerateInvoiceUseCase } from "./generate-invoice.usecase";

class InvoiceRepositoryMock implements IInvoiceGateway {
    generate = jest.fn();
    find = jest.fn();
}

describe("GenerateInvoiceUseCase unit tests", () => {
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
        invoiceRepository.generate.mockResolvedValue(invoiceMock);
        const useCase = new GenerateInvoiceUseCase(invoiceRepository);

        const itemsInput = invoiceMock.items.map(item => {
            return {
                id: item.id.id,
                name: item.name,
                price: item.price
            }
        })

        const input: IGenerateInvoiceUseCaseInputDto = {
            name: invoiceMock.name,
            document: invoiceMock.document,
            city: invoiceMock.address.city,
            complement: invoiceMock.address.complement,
            number: invoiceMock.address.number,
            state: invoiceMock.address.state,
            street: invoiceMock.address.street,
            zipCode: invoiceMock.address.zipCode,
            items: itemsInput
        }

        const output = await useCase.execute(input)

        const expectedTotal = item1.price + item2.price
        expect(output.total).toBe(expectedTotal)
        expect(invoiceRepository.generate).toHaveBeenCalled();
        expect(output.id).toBe(invoiceMock.id.id);
        expect(output.name).toBe(invoiceMock.name);
        expect(output.document).toBe(invoiceMock.document);
        expect(output.items.length).toBe(invoiceMock.items.length);
        expect(output.city).toBe(invoiceMock.address.city);
        expect(output.complement).toBe(invoiceMock.address.complement);
        expect(output.number).toBe(invoiceMock.address.number);
        expect(output.state).toBe(invoiceMock.address.state);
        expect(output.street).toBe(invoiceMock.address.street);
        expect(output.zipCode).toBe(invoiceMock.address.zipCode);
    })
})