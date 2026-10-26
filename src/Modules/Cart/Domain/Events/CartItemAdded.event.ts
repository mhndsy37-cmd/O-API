class CartItemAddedEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly cartId: string,
        public readonly userId: string,
        public readonly productId: string,
        public readonly quantity: number,
    ) {
        this.occurredAt = new Date();
    }
}
export{CartItemAddedEvent}