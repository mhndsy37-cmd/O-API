class PaymentSucceededEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly orderId: string,
        public readonly refId: string,
    ) {
        this.occurredAt = new Date();
    }
}
export { PaymentSucceededEvent }