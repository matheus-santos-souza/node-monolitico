import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "../repository/transaction.model";
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecase/process-payment/process-payment.usecase";
import { PaymentFacade } from "./payment.facade";
import { IPaymentFacadeInputDto } from "./payment.facade.dto";
import { PaymentFacadeFactory } from "../factory/payment.facade.factory";

describe("TransactionRepository test", () => {
    let sequelize!: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should save a transaction", async () => {
        const paymentFacade = PaymentFacadeFactory.create();

        const input: IPaymentFacadeInputDto = {
            amount: 100,
            orderId: "1"
        }

        const output = await paymentFacade.process(input)

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe("approved");
    })

})