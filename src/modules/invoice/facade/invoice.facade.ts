import { FindInvoiceUseCase } from "../usecase/find-invoice/find-invoice.usecase";
import { GenerateInvoiceUseCase } from "../usecase/generate-invoice/generate-invoice.usecase";
import { IGenerateInvoiceFacadeInputDto, IGenerateInvoiceFacadeOutputDto, IFindInvoiceFacadeInputDTO, IFindInvoiceFacadeOutputDTO } from "./invoice.facade.dto";
import { IInvoiceFacade } from "./invoice.facade.interface";

export class InvoiceFacade implements IInvoiceFacade {
    constructor(
        private readonly generateInvoiceUseCase: GenerateInvoiceUseCase,
        private readonly findInvoiceUseCase: FindInvoiceUseCase,
    ) {}

    async generate(input: IGenerateInvoiceFacadeInputDto): Promise<IGenerateInvoiceFacadeOutputDto> {
        const output = await this.generateInvoiceUseCase.execute({
            name: input.name,
            document: input.document, 
            city: input.city,
            complement: input.complement,
            number: input.number,
            state: input.state,
            street: input.street,
            zipCode: input.zipCode,
            items: input.items,
        })

        return {
            id: output.id,
            name: output.name,
            document: output.document, 
            city: output.city,
            complement: output.complement,
            number: output.number,
            state: output.state,
            street: output.street,
            zipCode: output.zipCode,
            items: output.items,
            total: output.total
        }
    }

    async find(input: IFindInvoiceFacadeInputDTO): Promise<IFindInvoiceFacadeOutputDTO> {
        const output = await this.findInvoiceUseCase.execute({ id: input.id })

        return {
            id: output.id,
            name: output.name,
            document: output.document, 
            total: output.total,
            createdAt: output.createdAt,
            address: output.address,
            items: output.items
        }
    }
}