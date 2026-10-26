import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { CartItem } from '../ValueObjects/CartItem.vo.js';
import { CartId } from '../ValueObjects/CartId.vo.js';
import { CartItemAddedEvent } from '../Events/CartItemAdded.event.js';
import { CartItemQuantityUpdatedEvent } from '../Events/CartItemQuantityUpdated.event.js';
import { CartItemRemovedEvent } from '../Events/CartItemRemove.event.js';
import { CartClearedEvent } from '../Events/CartCleared.event.js';
import { CartItemNotFoundException } from '../Exceptions/CartItemNotFound.exception.js';

export class Cart extends AggregateRoot {
    private constructor(
        private readonly id: CartId,
        private readonly userId: string,
        private items: CartItem[],
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) {
        super();
    }

    static create(userId: string): Cart {
        return new Cart(
            CartId.generate(),
            userId,
            [],
            new Date(),
            new Date()
        );
    }

    static restore(props: {
        id: CartId,
        userId: string,
        items: CartItem[],
        createdAt: Date,
        updatedAt: Date
    }): Cart {
        return new Cart(props.id, props.userId, props.items, props.createdAt, props.updatedAt);
    }
    addItem(productId: string, quantity: number): void {
        const existingItem = this.items.find(item => item.productId === productId);
        if (existingItem) {
            this.items = this.items.map(item =>
                item.productId === productId
                    ? item.increaseQuantity(quantity)
                    : item
            );
        } else {
            this.items.push(CartItem.create(productId, quantity));
        }
        this.addEvent(new CartItemAddedEvent(this.idToString(), this.userId, productId, quantity))
        this.touch();
    }

    updateItemQuantity(productId: string, quantity: number): void {
        const existingItemIndex = this.items.findIndex(item => item.productId === productId);

        if (existingItemIndex === -1) {
            throw new CartItemNotFoundException(productId);
        }
        this.items = this.items.map(item =>
            item.productId === productId
                ? item.updateQuantity(quantity)
                : item
        );
        this.addEvent(new CartItemQuantityUpdatedEvent(this.idToString(), this.userId, productId, quantity))
        this.touch();
    }
    removeItem(productId: string): void {
        this.items = this.items.filter(item => item.productId !== productId);
        this.addEvent(new CartItemRemovedEvent(this.idToString(), this.userId, productId))
        this.touch();
    }

    clearCart(): void {
        this.items = [];
        this.addEvent(new CartClearedEvent(this.idToString(), this.userId))
        this.touch();
    }
    getItemQuantity(productId: string): number {
        const item = this.items.find(i => i.productId === productId);
        return item ? item.getQuantity() : 0;
    }

    private touch(): void {
        this.updatedAt = new Date();
    }
    private idToString(): string {
        return (this.id).toString()
    }
    getId(): string { return this.idToString(); }
    getUserId(): string { return this.userId; }
    getItems(): CartItem[] { return this.items; }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }
}