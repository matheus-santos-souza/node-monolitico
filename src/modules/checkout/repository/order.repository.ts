import { Order } from "../domain/order.entity";
import { ICheckoutGateway } from "../gateway/checkout.gateway";
import { OrderProductModel } from "./order-product.model";
import { OrderModel } from "./order.model";

export class OrderRepository implements ICheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        await OrderModel.create(
            {
                id: order.id.id, 
                status: order.status,
                total: order.total,
                client_id: order.client.id.id,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                products: order.products.map(orderProduct => {
                    return {
                        id: orderProduct.id.id,
                        name: orderProduct.name,
                        salesPrice: orderProduct.salesPrice,
                        product_id: orderProduct.productId,
                        createdAt: orderProduct.createdAt,
                        updatedAt: orderProduct.updatedAt,
                    }
                }) as OrderProductModel[]
            },
            {
                include: [{ model: OrderProductModel }]
            }
        )
    }

    findOrder(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    
}