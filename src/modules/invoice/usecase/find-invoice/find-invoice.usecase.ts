import { IUseCase } from "src/modules/@shared/usecase/use-case.interface";
import { IFindInvoiceUseCaseInputDTO, IFindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";
import { IInvoiceGateway } from "../../gateway/invoice.gateway";

export class FindInvoiceUseCase implements IUseCase<IFindInvoiceUseCaseInputDTO, IFindInvoiceUseCaseOutputDTO> {
    constructor(
        private readonly invoiceRepository: IInvoiceGateway,
    ) {}
    
    async execute(input: IFindInvoiceUseCaseInputDTO): Promise<IFindInvoiceUseCaseOutputDTO> {
        const invoice = await this.invoiceRepository.find(input.id);

        if (!invoice) {
            throw new Error("Invoice not exists!")
        }

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            total: invoice.total,
            createdAt: invoice.createdAt,
            address: {
                city: invoice.address.city,
                complement: invoice.address.complement,
                number: invoice.address.number,
                state: invoice.address.state,
                street: invoice.address.street, 
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            })
        }
    } 
}