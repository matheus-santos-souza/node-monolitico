import { SequelizeFactory } from "src/infra/database/sequelize/factory/sequelize.factory";
import { httpServer } from "../../app";
import request from 'supertest'
import { Sequelize } from "sequelize-typescript";
import Address from "src/modules/@shared/domain/value-object/address.value-object";
import { Client } from "src/modules/client-adm/domain/client.entity";
import { ClientModel } from "src/modules/client-adm/repository/client.model";
import { ProductStoreCatalogModel } from "src/modules/store-catalog/repository/product.model";
import { Product } from "src/modules/checkout/domain/product.entity";
import { migrator } from "src/infra/database/sequelize/test-migrations/config-migrations/migrator";
import { Umzug } from "umzug";
import { ProductModel } from "src/modules/product-adm/repository/product.model";

describe("E2E test for Invoice", () => {
    let sequelize: Sequelize
    let migration: Umzug<any>;

    beforeEach(async () => {
        const database = await SequelizeFactory.createMigrator();
        sequelize = database.sequelize
        migration = database.migration
    })

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it("Should create a checkout and get invoice by id", async () => {
        const product = new Product({
            name: "Product 1",
            description: "Description 1",
            salesPrice: 10
        })

        const productTwo = new Product({
            name: "Product 2",
            description: "Description 2",
            salesPrice: 20
        })

        await ProductStoreCatalogModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        });

        await ProductStoreCatalogModel.create({
            id: productTwo.id.id,
            name: productTwo.name,
            description: productTwo.description,
            salesPrice: productTwo.salesPrice
        });

        await ProductModel.update(
            {
                stock: 10,
            }, 
            { where: { id: product.id.id } }
        )

        await ProductModel.update(
            {
                stock: 10,
            }, 
            { where: { id: productTwo.id.id } }
        )

        const client = new Client({
            name: "Client 1",
            document: "Document 1",
            email: "email@email.com",
            address: new Address(
                "street 1",
                10,
                "Complement 1",
                "City 1",
                "State 1",
                "zipCode 1"
            )
        })


        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipCode: client.address.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })



        const response = await request(httpServer)
            .post('/checkout')
            .send({
                "clientId": client.id.id,
                "products": [
                    {
                        "productId": product.id.id
                    },
                    {
                        "productId": productTwo.id.id
                    }
                ]
            })
        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.invoiceId).toBeDefined()
        expect(response.body.status).toBe("approved")
        expect(response.body.total).toBe(30)
        expect(response.body.products[0].productId).toBe(product.id.id)
        expect(response.body.products[1].productId).toBe(productTwo.id.id)

        const responseInvoice = await request(httpServer)
            .get(`/invoice/${response.body.invoiceId}`)
            .send()
        
        expect(responseInvoice.status).toBe(200)
        expect(responseInvoice.body.id).toBeDefined()
        expect(responseInvoice.body.document).toBe(client.document)
        expect(responseInvoice.body.address.city).toBe(client.address.city)
        expect(responseInvoice.body.address.number).toBe(client.address.number)
        expect(responseInvoice.body.address.complement).toBe(client.address.complement)
        expect(responseInvoice.body.address.state).toBe(client.address.state)
        expect(responseInvoice.body.address.zipCode).toBe(client.address.zipCode)
        expect(responseInvoice.body.items[0].id).toBe(product.id.id)
        expect(responseInvoice.body.items[1].id).toBe(productTwo.id.id)
        expect(responseInvoice.body.total).toBe(30)
        expect(responseInvoice.body.createdAt).toBeDefined()
    })
})