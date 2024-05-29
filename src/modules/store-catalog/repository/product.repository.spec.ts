import { Sequelize } from "sequelize-typescript";
import { ProductStoreCatalogModel } from "./product.model";
import { ProductRepository } from "./product.repository";

describe("ProductRepository unit test", () => {
    let sequelize!: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductStoreCatalogModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should find all products", async () => {
        const product1 = await ProductStoreCatalogModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 10
        })

        const product2 = await ProductStoreCatalogModel.create({
            id: "2",
            name: "Product 2",
            description: "Description 2",
            salesPrice: 20
        })

        const productRepository = new ProductRepository()
        const products = await productRepository.findAll();

        expect(products.length).toBe(2)
        expect(products[0].id.id).toBe(product1.id)
        expect(products[0].name).toBe(product1.name)
        expect(products[0].description).toBe(product1.description)
        expect(products[0].salesPrice).toBe(product1.salesPrice)
        expect(products[1].id.id).toBe(product2.id)
        expect(products[1].name).toBe(product2.name)
        expect(products[1].description).toBe(product2.description)
        expect(products[1].salesPrice).toBe(product2.salesPrice)
    })

    it("should find a product", async () => {
        const product = await ProductStoreCatalogModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 10
        })

        const productRepository = new ProductRepository()
        const findProduct = await productRepository.find(product.id);

        expect(findProduct.id.id).toBe(product.id)
        expect(findProduct.name).toBe(product.name)
        expect(findProduct.description).toBe(product.description)
        expect(findProduct.salesPrice).toBe(product.salesPrice)
    })

})