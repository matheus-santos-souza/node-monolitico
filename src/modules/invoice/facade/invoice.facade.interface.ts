import { IFindInvoiceFacadeInputDTO, IFindInvoiceFacadeOutputDTO, IGenerateInvoiceFacadeInputDto, IGenerateInvoiceFacadeOutputDto } from "./invoice.facade.dto";

export interface IInvoiceFacade {
    generate(input: IGenerateInvoiceFacadeInputDto): Promise<IGenerateInvoiceFacadeOutputDto>;
    find(input: IFindInvoiceFacadeInputDTO): Promise<IFindInvoiceFacadeOutputDTO>;
}