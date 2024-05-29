import { SequelizeFactory } from "src/infra/database/sequelize/factory/sequelize.factory";
import { httpServer } from "../../app";
import request from 'supertest'
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { migrator } from "src/test-migrations/config-migrations/migrator";

describe("E2E test for Product", () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;

    beforeEach(async () => {
        const database = await SequelizeFactory.createMigrator();
        sequelize = database.sequelize
        migration = database.migration
    })

    afterAll(async () => {
        if (!migration || !sequelize) {
            return 
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it("Should create product", async () => {
        const response = await request(httpServer)
            .post('/product')
            .send({
                "name": "Product 1",
                "description": "Description product 1",
                "purchasePrice": 10,
                "stock": 30
            })
        
        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe("Product 1")
        expect(response.body.description).toBe("Description product 1")
        expect(response.body.purchasePrice).toBe(10)
        expect(response.body.createdAt).toBeDefined()
        expect(response.body.updatedAt).toBeDefined()
    })

    it("Should throw error create product", async () => {
        const response = await request(httpServer)
            .post('/product')
            .send({})
        
        expect(response.status).toBe(500)  
    })
})