import { Order } from "../domain/order.entity";
import { ICheckoutGateway } from "../gateway/checkout.gateway";
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
                updatedAt: order.updatedAt
            }
        )
    }

    findOrder(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    
}