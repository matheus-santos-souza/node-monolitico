import { Sequelize } from "sequelize-typescript";
import { ProductAdmFacadeFactory } from "../factory/product-adm.facade.factory";
import { ProductModel } from "../repository/product.model";


describe("ProductAdmFacade unit tests", () => {
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

    it("should create a product", async () => {
        const productAdmFacade = ProductAdmFacadeFactory.create()
        const input = {
            id: "1",
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 100,
            stock: 10
        }

        await productAdmFacade.addProduct(input)

        const product = await ProductModel.findOne({
            where: { id: input.id }
        })

        expect(product).toBeDefined();
        expect(product.id).toBe(input.id)
        expect(product.name).toBe(input.name)
        expect(product.description).toBe(input.description)
        expect(product.purchasePrice).toBe(input.purchasePrice)
        expect(product.stock).toBe(input.stock)
    })

    it("should find stock a product", async () => {
        const productAdmFacade = ProductAdmFacadeFactory.create()
        

        const porduct = await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const input = {
            productId: "1",
        }
        const output = await productAdmFacade.checkStock(input)

        expect(output).toBeDefined();
        expect(output.productId).toBe(porduct.id)
        expect(output.stock).toBe(porduct.stock)
    })
})