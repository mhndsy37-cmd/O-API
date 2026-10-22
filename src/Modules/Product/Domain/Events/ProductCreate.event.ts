class ProductCreatedEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly productId: string,
        public readonly title: string,
        public readonly price: number,      
        public readonly stock: number,  
        public readonly sellerId:string
    ) {
        this.occurredAt = new Date();
    }
}
export{ProductCreatedEvent}