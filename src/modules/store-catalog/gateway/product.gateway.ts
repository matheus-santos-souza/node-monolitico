import { Product } from "../domain/product.entity";

export interface IProductGateway {
    findAll(): Promise<Product[]>;
    find(id: string): Promise<Product>;
}