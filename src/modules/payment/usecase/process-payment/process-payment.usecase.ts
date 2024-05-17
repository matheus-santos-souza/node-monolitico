import { IUseCase } from "src/modules/@shared/usecase/use-case.interface";
import { IProcessPaymentInputDto, IProcessPaymentOutputDto } from "./process-payment.usecase.dto";
import { IPaymentGateway } from "../../gatewey/payment.gateway";
import { Transaction } from "../../domain/transaction";

export class ProcessPaymentUseCase implements IUseCase<IProcessPaymentInputDto, IProcessPaymentOutputDto> {
    constructor(
        private readonly transactionRepository: IPaymentGateway,
    ) {}

    async execute(input: IProcessPaymentInputDto): Promise<IProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        })
        transaction.process();
        const persistTransaction = await this.transactionRepository.save(transaction);
        return {
            transactionId: persistTransaction.id.id,
            amount: persistTransaction.amount,
            orderId: persistTransaction.orderId,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt
        }
    }
    
}