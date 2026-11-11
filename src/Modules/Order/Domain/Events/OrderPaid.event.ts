export class OrderPaidEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly orderId: string,
        public readonly refId: string,
        public readonly amount: number,
        public readonly userEmail: string | null,
        public readonly userPhone: string,
    ) {
        this.occurredAt = new Date();
    }
}