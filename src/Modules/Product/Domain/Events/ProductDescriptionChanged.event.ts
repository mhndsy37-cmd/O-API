class ProductDescriptionChangedEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly productId: string,
        public readonly oldDescription: string,
        public readonly newDescription: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{ProductDescriptionChangedEvent}