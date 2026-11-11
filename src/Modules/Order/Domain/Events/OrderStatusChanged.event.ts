import { OrderStatus } from '../Enums/OrderStatus.enum.js';

export class OrderStatusChangedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly orderId: string,
        public readonly newStatus: OrderStatus,
        public readonly userEmail: string | null,
        public readonly userPhone: string,
    ) {
        this.occurredAt = new Date();
    }
}