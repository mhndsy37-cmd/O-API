class ProductTitleChangedEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly productId: string,
        public readonly oldTitle: string,
        public readonly newTitle: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{ProductTitleChangedEvent}