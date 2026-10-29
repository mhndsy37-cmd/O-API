import { OrderDocument } from '../Schemas/Order.schema.js';
import { Order } from '../../Domain/Entities/Order.entity.js';
import { OrderStatus } from '../../Domain/Enums/OrderStatus.enum.js';
import { OrderItem } from '../../Domain/ValueObjects/OrderItem.vo.js';
class OrderInfrastructureMapper {
    static toDomain(doc: OrderDocument): Order {
        return Order.restore({
            id: doc._id.toString(),
            userId: doc.userId,
            items: doc.items.map(i =>OrderItem.create(i.productId, i.title, i.price, i.quantity)),
            totalPrice: doc.totalPrice,
            status: doc.status as OrderStatus,
            paymentAuthority: doc.paymentAuthority,
            createdAt: doc.createdAt || new Date(),
            updatedAt: doc.updatedAt || new Date(),
        });
    }

    static toPersistence(order: Order): any {
        return {
            userId: order.getUserId(),
            items: order.getItems().map(item => ({productId: item.productId,title: item.title,price: item.price,quantity: item.quantity,})),
            totalPrice: order.getTotalPrice(),
            status: order.getStatus(),
            paymentAuthority: order.getPaymentAuthority()
        };
    }
}
export { OrderInfrastructureMapper }