import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { StoreCatalogFacadeFactory } from "../factory/facade.factory";
import { IFindStoreFacadeInputDto } from "./store-catalog.facade.dto";

describe("StoreCatalogFacade unit test", () => {
    let sequelize!: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should find a product", async () => {
        const product = await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 10
        })

        const facade = StoreCatalogFacadeFactory.create()
        const input: IFindStoreFacadeInputDto = {
            productId: product.id
        }
        const output = await facade.find(input)

        expect(output.id).toBe(product.id)
        expect(output.name).toBe(product.name)
        expect(output.description).toBe(product.description)
        expect(output.salesPrice).toBe(product.salesPrice)
    })

    it("should find all a product", async () => {
        const product1 = await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 10
        })

        const product2 = await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Description 2",
            salesPrice: 20
        })

        const facade = StoreCatalogFacadeFactory.create()

        const output = await facade.findAll({})

        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[0].description).toBe(product1.description)
        expect(output.products[0].salesPrice).toBe(product1.salesPrice)
        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].description).toBe(product2.description)
        expect(output.products[1].salesPrice).toBe(product2.salesPrice)
    })
})