import { IPaymentFacadeInputDto, IPaymentFacadeOutputDto } from "./payment.facade.dto";

export interface IPaymentFacade {
    process(input: IPaymentFacadeInputDto): Promise<IPaymentFacadeOutputDto>;
}