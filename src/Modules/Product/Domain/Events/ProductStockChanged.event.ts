import { ProductReduceStock } from "../Enums/ProductReduceStock.enum.js";

class ProductStockChangedEvent {
    public readonly occurredAt: Date;
    constructor(
        public readonly productId: string,
        public readonly title: string,
        public readonly oldStock: number,
        public readonly newStock: number,
        public readonly changeAmount: number,
        public readonly reason:ProductReduceStock ,
    ) {
        this.occurredAt = new Date();
    }
}
export{ProductStockChangedEvent}