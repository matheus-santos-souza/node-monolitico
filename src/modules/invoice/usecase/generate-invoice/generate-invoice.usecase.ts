import { IUseCase } from "src/modules/@shared/usecase/use-case.interface";
import { IGenerateInvoiceUseCaseInputDto, IGenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";
import { IInvoiceGateway } from "../../gateway/invoice.gateway";
import { InvoiceItem } from "../../domain/entity/invoice-item.entity";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Address } from "../../domain/value-object/address.value-object";
import { Invoice } from "../../domain/entity/invoice.entity";

export class GenerateInvoiceUseCase implements IUseCase<IGenerateInvoiceUseCaseInputDto, IGenerateInvoiceUseCaseOutputDto> {
    constructor(
        private readonly invoiceRepository: IInvoiceGateway,
    ) {}

    async execute(input: IGenerateInvoiceUseCaseInputDto): Promise<IGenerateInvoiceUseCaseOutputDto> {
        const items = input.items.map(item => {
            return new InvoiceItem({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            })
        })

        const address = new Address({
            city: input.city,
            complement: input.complement,
            number: input.number,
            state: input.state,
            street: input.street,
            zipCode: input.zipCode
        })

        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address,
            items
        })

        const generateInvoice = await this.invoiceRepository.generate(invoice);

        return {
            id: generateInvoice.id.id,
            name: generateInvoice.name,
            document: generateInvoice.document,
            total: generateInvoice.total,
            city: generateInvoice.address.city,
            complement: generateInvoice.address.complement,
            number: generateInvoice.address.number,
            state: generateInvoice.address.state,
            street: generateInvoice.address.street,
            zipCode: generateInvoice.address.zipCode,
            items: generateInvoice.items.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            })
        }
    }  
}