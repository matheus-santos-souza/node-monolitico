import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import { IAddClientFacadeInputDto, IFindClientFacadeInputDto } from "./client-adm.facade.dto";
import { ClientAdmFacadeFactory } from "../factory/client-adm.factory";
import Address from "src/modules/@shared/domain/value-object/address.value-object";

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
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                99,
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888",
            )
        }

        const output = await facade.add(input)

        const client = await ClientModel.findOne({
            where: { id: output.id }
        })

        expect(client.id).toBe(output.id)
        expect(client.name).toBe(output.name)
        expect(client.email).toBe(output.email)
        expect(client.city).toStrictEqual(output.address.city)
        expect(client.complement).toStrictEqual(output.address.complement)
        expect(client.number).toStrictEqual(output.address.number)
        expect(client.state).toStrictEqual(output.address.state)
        expect(client.street).toStrictEqual(output.address.street)
        expect(client.zipCode).toStrictEqual(output.address.zipCode)
        expect(client.createdAt).toStrictEqual(output.createdAt)
        expect(client.updatedAt).toStrictEqual(output.updatedAt)
    })

    it("should find a client", async () => {
        const facade = ClientAdmFacadeFactory.create()
        
        const client = await ClientModel.create({
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

        const input: IFindClientFacadeInputDto = {
            clientId: client.id
        }

        const output = await facade.find(input)

        expect(client.id).toBe(output.id)
        expect(client.name).toBe(output.name)
        expect(client.email).toBe(output.email)
        expect(client.city).toStrictEqual(output.address.city)
        expect(client.complement).toStrictEqual(output.address.complement)
        expect(client.number).toStrictEqual(output.address.number)
        expect(client.state).toStrictEqual(output.address.state)
        expect(client.street).toStrictEqual(output.address.street)
        expect(client.zipCode).toStrictEqual(output.address.zipCode)
        expect(client.createdAt).toStrictEqual(output.createdAt)
        expect(client.updatedAt).toStrictEqual(output.updatedAt)
    })
})