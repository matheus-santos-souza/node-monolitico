import { Transaction } from "../domain/transaction";
import { IPaymentGateway } from "../gatewey/payment.gateway";
import { TransactionModel } from "./transaction.model";

export class TransactionRepository implements IPaymentGateway {
    async save(input: Transaction): Promise<Transaction> {
        await TransactionModel.create({
            id: input.id.id,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        })

        return input
    }

}