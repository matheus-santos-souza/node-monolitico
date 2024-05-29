import { SequelizeFactory } from "src/infra/database/sequelize/factory/sequelize.factory";
import { httpServer } from "../../app";
import request from 'supertest'
import { Sequelize } from "sequelize-typescript";
import Address from "src/modules/@shared/domain/value-object/address.value-object";
import { Client } from "src/modules/client-adm/domain/client.entity";
import { ClientModel } from "src/modules/client-adm/repository/client.model";
import { ProductStoreCatalogModel } from "src/modules/store-catalog/repository/product.model";
import { Product } from "src/modules/checkout/domain/product.entity";

describe("E2E test for Checkout", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = await SequelizeFactory.create();
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a checkout", async () => {
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
                "products":[
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
        expect(response.body.status).toBe(30)
        expect(response.body.products[0].productId).toBe(product.id.id)
        expect(response.body.products[1].productId).toBe(product.id.id)
    
    })
})