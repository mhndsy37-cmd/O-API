class CartClearedEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly cartId: string,
        public readonly userId: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{CartClearedEvent}