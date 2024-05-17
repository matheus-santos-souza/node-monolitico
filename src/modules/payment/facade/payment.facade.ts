import { ProcessPaymentUseCase } from "../usecase/process-payment/process-payment.usecase";
import { IPaymentFacadeInputDto, IPaymentFacadeOutputDto } from "./payment.facade.dto";
import { IPaymentFacade } from "./payment.facade.interface";

export class PaymentFacade implements IPaymentFacade {
    constructor(
        private readonly processPaymentUseCase: ProcessPaymentUseCase,
    ) {}

    async process(input: IPaymentFacadeInputDto): Promise<IPaymentFacadeOutputDto> {
        const output = await this.processPaymentUseCase.execute({
            amount: input.amount,
            orderId: input.orderId
        })

        return {
            transactionId: output.transactionId,
            amount: output.amount,
            orderId: output.orderId,
            status: output.status,
            createdAt: output.createdAt,
            updatedAt: output.updatedAt,
        }
    }
    
}