class CartItemRemovedEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly cartId: string,
        public readonly userId: string,
        public readonly productId: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{CartItemRemovedEvent}