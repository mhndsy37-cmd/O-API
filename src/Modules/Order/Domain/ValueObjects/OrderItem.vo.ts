class OrderItem {
    private constructor(
        public readonly productId: string,
        public readonly title: string,
        public readonly price: number,
        public readonly quantity: number,
    ) { }

    static create(productId: string, title: string, price: number, quantity: number): OrderItem {
        return new OrderItem(productId, title, price, quantity);
    }

    getTotalPrice(): number {
        return this.price * this.quantity;
    }
}
export{OrderItem}