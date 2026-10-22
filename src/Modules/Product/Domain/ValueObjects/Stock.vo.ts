import { ErrorStockReason, InvalidStockException } from '../Exceptions/InvalidStock.exception.js';

class Stock {
    private constructor(private readonly quantity: number) {}

    static create(quantity: number): Stock {
        if (quantity < 0) {
            throw new InvalidStockException(ErrorStockReason.NEGATIVE);
        }
        return new Stock(quantity);
    }
    reduce(amount: number): Stock {
        if (amount > this.quantity) {
            throw new InvalidStockException(ErrorStockReason.NOT_AVAILABLE_ENOUGH);
        }
        return new Stock(this.quantity - amount);
    }
    increase(amount: number): Stock {
        return new Stock(this.quantity + amount);
    }

    getValue(): number {
        return this.quantity;
    }

    isAvailable(): boolean {
        return this.quantity > 0;
    }
}
export{Stock}