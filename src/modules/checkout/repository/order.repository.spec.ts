import { Sequelize } from "sequelize-typescript";
import { SequelizeFactory } from "src/infra/database/sequelize/factory/sequelize.factory";
import { Product } from "../domain/product.entity";
import { Order } from "../domain/order.entity";
import { Client } from "../domain/client.entity";
import Address from "src/modules/@shared/domain/value-object/address.value-object";
import { OrderProduct } from "../domain/order-product.entity";
import { ProductStoreCatalogModel } from "src/modules/store-catalog/repository/product.model";
import { ClientModel } from "src/modules/client-adm/repository/client.model";
import { OrderRepository } from "./order.repository";
import { OrderProductModel } from "./order-product.model";
import { OrderModel } from "./order.model";

describe("OrderRepository tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await SequelizeFactory.create()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a order", async () => {
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

        const orderProduct = new OrderProduct({
            name: product.name,
            productId: product.id.id,
            salesPrice: product.salesPrice,
        })

        const orderProductTwo = new OrderProduct({
            name: productTwo.name,
            productId: productTwo.id.id,
            salesPrice: productTwo.salesPrice,
        })

        const order = new Order({
            client,
            products: [orderProduct, orderProductTwo]
        })

        const repository = new OrderRepository()
        await repository.addOrder(order);

        const findOrder = await OrderModel.findOne({
            where: {
                id: order.id.id
            },
            include: [OrderProductModel, ClientModel]
        })
        
        expect(findOrder.id).toBe(order.id.id)
        expect(findOrder.client.id).toBe(order.client.id.id)
        expect(findOrder.products[0].product_id).toBe(order.products[0].productId)
        expect(findOrder.products[1].product_id).toBe(order.products[1].productId)
    })
})