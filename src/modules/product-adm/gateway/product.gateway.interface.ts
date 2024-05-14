import { Product } from "../domain/product.entity";

export interface IProductGateway {
    add(product: Product): Promise<void>;
    find(id: string): Promise<Product>;
}