import { Order } from '../Entities/Order.entity.js';

interface IOrderRepository {
    findById(id: string): Promise<Order | null>;
    findByUserId(userId: string): Promise<Order[]>;
    findByPaymentAuthority(authority: string): Promise<Order | null>;
    save(order: Order): Promise<void>;
}
export { IOrderRepository }