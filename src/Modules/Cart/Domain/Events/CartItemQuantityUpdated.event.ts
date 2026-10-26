class CartItemQuantityUpdatedEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly cartId: string,
        public readonly userId: string,
        public readonly productId: string,
        public readonly newQuantity: number,
    ) {
        this.occurredAt = new Date();
    }
}
export{CartItemQuantityUpdatedEvent}