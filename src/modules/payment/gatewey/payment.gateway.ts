import { Transaction } from "../domain/transaction";

export interface IPaymentGateway {
    save(input: Transaction): Promise<Transaction>;
}