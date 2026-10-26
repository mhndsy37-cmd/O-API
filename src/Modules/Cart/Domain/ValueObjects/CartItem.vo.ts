import { InvalidCartQuantityException } from '../Exceptions/InvalidCartQuantity.exception.js';
import { maxPerItemException } from '../Exceptions/maxPerItem.exception.js';

class CartItem {
    private static readonly MAX_PER_ITEM = 10;
    private constructor(
        public readonly productId: string,
        private quantity: number,
    ) { }
    static create(productId: string, quantity: number): CartItem {
        if (quantity <= 0) {
            throw new InvalidCartQuantityException();
        }
        return new CartItem(productId, quantity);
    }
    increaseQuantity(amount: number): CartItem {
        if (amount <= 0) return this;
        return new CartItem(this.productId, this.quantity + amount);
    }
    updateQuantity(newQuantity: number): CartItem {
        if (newQuantity <= 0) {
            throw new InvalidCartQuantityException();
        }
        if (newQuantity > CartItem.MAX_PER_ITEM) {
            throw new maxPerItemException(CartItem.MAX_PER_ITEM);
        }
        return new CartItem(this.productId, newQuantity);
    }
    getQuantity(): number {
        return this.quantity;
    }
}
export { CartItem }