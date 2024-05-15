import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { ClientRepository } from "./client.repository";
import { Client } from "../domain/client.entity";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object";

describe("ClientRepository unit test", () => {
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

    it("should find client", async () => {
        const createClient = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "email@email.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const clientRepository = new ClientRepository()
        const client = await clientRepository.find(createClient.id)

        expect(client.id.id).toBe(createClient.id)
        expect(client.name).toBe(createClient.name)
        expect(client.email).toBe(createClient.email)
        expect(client.address).toBe(createClient.address)
        expect(client.createdAt).toStrictEqual(createClient.createdAt)
        expect(client.updatedAt).toStrictEqual(createClient.updatedAt)
    })

    it("should create client", async () => {
        const clientRepository = new ClientRepository()
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "email@email.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await clientRepository.add(client)

        const findClient = await ClientModel.findOne({
            where: { id: client.id.id }
        })

        expect(client.id.id).toBe(findClient.id)
        expect(client.name).toBe(findClient.name)
        expect(client.email).toBe(findClient.email)
        expect(client.address).toBe(findClient.address)
        expect(client.createdAt).toStrictEqual(findClient.createdAt)
        expect(client.updatedAt).toStrictEqual(findClient.updatedAt)
    })
})