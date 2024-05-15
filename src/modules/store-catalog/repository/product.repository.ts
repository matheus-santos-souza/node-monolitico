import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Product } from "../domain/product.entity";
import { IProductGateway } from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export class ProductRepository implements IProductGateway {
    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll()

        return products.map((product) => {
            return new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            })
        })
    }

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({
            where: { id }
        })

        if (!product) {
            throw new Error(`Product is not exists`)
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        })
    }
    
}