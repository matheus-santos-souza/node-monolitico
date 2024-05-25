import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { ClientRepository } from "./client.repository";
import { Client } from "../domain/client.entity";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import Address from "src/modules/@shared/domain/value-object/address.value-object";

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
            document: "1234-5678",
            street: "Rua 123",
            number: 99,
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipCode: "88888-888",  
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const clientRepository = new ClientRepository()
        const client = await clientRepository.find(createClient.id)

        expect(client.id.id).toBe(createClient.id)
        expect(client.name).toBe(createClient.name)
        expect(client.email).toBe(createClient.email)
        expect(client.document).toBe(createClient.document)
        expect(client.address.street).toBe(createClient.street)
        expect(client.address.number).toBe(createClient.number)
        expect(client.address.complement).toBe(createClient.complement)
        expect(client.address.city).toBe(createClient.city)
        expect(client.address.state).toBe(createClient.state)
        expect(client.address.zipCode).toBe(createClient.zipCode)
        expect(client.createdAt).toStrictEqual(createClient.createdAt)
        expect(client.updatedAt).toStrictEqual(createClient.updatedAt)
    })

    it("should create client", async () => {
        const clientRepository = new ClientRepository()
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "email@email.com",
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                99,
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888"
            ),
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
        expect(client.address.street).toBe(findClient.street)
        expect(client.address.number).toBe(findClient.number)
        expect(client.address.complement).toBe(findClient.complement)
        expect(client.address.city).toBe(findClient.city)
        expect(client.address.state).toBe(findClient.state)
        expect(client.address.zipCode).toBe(findClient.zipCode)
        expect(client.createdAt).toStrictEqual(findClient.createdAt)
        expect(client.updatedAt).toStrictEqual(findClient.updatedAt)
    })
})