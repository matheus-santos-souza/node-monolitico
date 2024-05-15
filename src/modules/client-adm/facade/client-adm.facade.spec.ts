import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";
import { IAddClientFacadeInputDto, IFindClientFacadeInputDto } from "./client-adm.facade.dto";
import { ClientAdmFacade } from "./client-adm.facade";
import { ClientAdmFacadeFactory } from "../factory/client-adm.factory";

describe("ClientAdmFacade unit test", () => {
    let sequelize!: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a client", async () => {
        const facade = ClientAdmFacadeFactory.create()

        const input: IAddClientFacadeInputDto = {
            name: "Client 1",
            email: "email@email.com",
            address: "Address 1"
        }

        const output = await facade.add(input)

        const client = await ClientModel.findOne({
            where: { id: output.id }
        })

        expect(client.id).toBe(output.id)
        expect(client.name).toBe(output.name)
        expect(client.email).toBe(output.email)
        expect(client.address).toBe(output.address)
        expect(client.createdAt).toStrictEqual(output.createdAt)
        expect(client.updatedAt).toStrictEqual(output.updatedAt)
    })

    it("should find a client", async () => {
        const facade = ClientAdmFacadeFactory.create()
        
        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "email@email.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const input: IFindClientFacadeInputDto = {
            clientId: client.id
        }

        const output = await facade.find(input)

        expect(client.id).toBe(output.id)
        expect(client.name).toBe(output.name)
        expect(client.email).toBe(output.email)
        expect(client.address).toBe(output.address)
        expect(client.createdAt).toStrictEqual(output.createdAt)
        expect(client.updatedAt).toStrictEqual(output.updatedAt)
    })
})