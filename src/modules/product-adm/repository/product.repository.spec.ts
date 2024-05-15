import { Sequelize } from "sequelize-typescript"
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../domain/product.entity";
import { ProductModel } from "./product.model";
import { ProductRepository } from "./product.repository";


describe("ProductRepository unit tests", () => {
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
        const product = new Product({
            id: new Id("1232"),
            name: "Product 1",
            description: "description 1",
            purchasePrice: 100,
            stock: 10
        })
        const productRepository = new ProductRepository();
        await productRepository.add(product);

        const findProductDb = await ProductModel.findOne({
            where: {
                id: product.id.id
            }
        })

        expect(findProductDb.id).toBe(product.id.id)
        expect(findProductDb.name).toBe(product.name)
        expect(findProductDb.description).toBe(product.description)
        expect(findProductDb.purchasePrice).toBe(product.purchasePrice)
        expect(findProductDb.stock).toBe(product.stock)
        expect(findProductDb.createdAt).toEqual(product.createdAt)
        expect(findProductDb.updatedAt).toEqual(product.updatedAt)
    })

    it("should create a product", async () => {
        const productRepository = new ProductRepository();

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const product = await productRepository.find("1");

        expect(product.id.id).toEqual("1");
        expect(product.name).toEqual("Product 1");
        expect(product.description).toEqual("Product 1 description");
        expect(product.purchasePrice).toEqual(100);
        expect(product.stock).toEqual(10);
    })
})