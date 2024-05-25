import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Transaction } from "../../domain/transaction";
import { IPaymentGateway } from "../../gateway/payment.gateway";
import { ProcessPaymentUseCase } from "./process-payment.usecase";
import { IProcessPaymentInputDto } from "./process-payment.usecase.dto";

class TransactionRepositoryMock implements IPaymentGateway {
    save = jest.fn();
}

describe("ProcessPaymentUseCase unit tests", () => {
    let transactionRepository: TransactionRepositoryMock;

    beforeEach(() => {
        transactionRepository = new TransactionRepositoryMock()
    })

    it("should approve a transaction", async () => {
        const transactionMock = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1",
            status: "approved"
        })
    
        transactionRepository.save.mockResolvedValue(transactionMock);
        const useCase = new ProcessPaymentUseCase(transactionRepository);
        const input: IProcessPaymentInputDto = {
            orderId: transactionMock.orderId,
            amount: transactionMock.amount
        }
        const output = await useCase.execute(input);

        expect(transactionRepository.save).toHaveBeenCalled();
        expect(output.transactionId).toBe(transactionMock.id.id);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe(transactionMock.status);
        expect(output.createdAt).toStrictEqual(transactionMock.createdAt);
        expect(output.updatedAt).toStrictEqual(transactionMock.updatedAt);
    })

    it("should decline a transaction", async () => {
        const transactionMock = new Transaction({
            id: new Id("1"),
            amount: 50,
            orderId: "1",
            status: "declined"
        })
    
        transactionRepository.save.mockResolvedValue(transactionMock);
        const useCase = new ProcessPaymentUseCase(transactionRepository);
        const input: IProcessPaymentInputDto = {
            orderId: transactionMock.orderId,
            amount: transactionMock.amount
        }
        const output = await useCase.execute(input);

        expect(transactionRepository.save).toHaveBeenCalled();
        expect(output.transactionId).toBe(transactionMock.id.id);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe(transactionMock.status);
        expect(output.createdAt).toStrictEqual(transactionMock.createdAt);
        expect(output.updatedAt).toStrictEqual(transactionMock.updatedAt);
    })
})