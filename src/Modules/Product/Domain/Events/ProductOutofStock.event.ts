class ProductOutOfStockEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly productId: string,
        public readonly title: string,   
             
    ) {
        this.occurredAt = new Date();
    }
}
export{ProductOutOfStockEvent}