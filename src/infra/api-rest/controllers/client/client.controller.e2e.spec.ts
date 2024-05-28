import { SequelizeFactory } from "src/infra/database/sequelize/factory/sequelize.factory";
import { httpServer } from "../../app";
import request from 'supertest'
import { Sequelize } from "sequelize-typescript";

describe("E2E test for Client", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = await SequelizeFactory.create();
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create client", async () => {
        const response = await request(httpServer)
            .post('/client')
            .send({
                name: "Client 1",
                email: "email@email.com",
                document: "Document 1",
                street: "street 1",
                number: "number 1",
                complement: "complement 1",
                city: "city 1",
                state: "state 1",
                zipCode: "zipCode 1",
            })
        
        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe("Client 1")
        expect(response.body.email).toBe("email@email.com")
        expect(response.body.document).toBe("Document 1")
        expect(response.body.address._street).toBe("street 1")
        expect(response.body.address._number).toBe("number 1")
        expect(response.body.address._complement).toBe("complement 1")
        expect(response.body.address._city).toBe("city 1")
        expect(response.body.address._state).toBe("state 1")
        expect(response.body.address._zipCode).toBe("zipCode 1")
        expect(response.body.createdAt).toBeDefined()
        expect(response.body.updatedAt).toBeDefined()
    })
})