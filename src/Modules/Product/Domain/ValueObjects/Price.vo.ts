import { ErrorPriceReason, InvalidPriceException } from '../Exceptions/InvalidPrice.exception.js';

class Price {
    private constructor(private readonly value: number) { }

    static create(amount: number): Price {
        if (amount < 0) {
            throw new InvalidPriceException(ErrorPriceReason.NEGATIVE);
        }
        return new Price(Math.round(amount * 100) / 100);
    }

    getValue(): number {
        return this.value;
    }
    equals(other: Price): boolean {
        return this.value === other.value;
    }
}
export { Price }