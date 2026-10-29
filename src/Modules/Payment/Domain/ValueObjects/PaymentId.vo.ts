import { ObjectId } from "bson";
import { ErrorPaymentIdReason, InvalidPaymentIdException } from "../Exceptions/InvalidPaymentId.exception.js";

class PaymentId {
    private constructor(private readonly value: ObjectId) {}

    static generate(): PaymentId {
        return new PaymentId(new ObjectId());
    }

    static createFromPlain(value: string): PaymentId {
        if (!value || !ObjectId.isValid(value)) {
            throw new InvalidPaymentIdException(ErrorPaymentIdReason.FORMAT);
        }
        return new PaymentId(new ObjectId(value));
    }

    getValue(): ObjectId {
        return this.value;
    }

    toString(): string {
        return this.value.toHexString();
    }

    equals(other: PaymentId): boolean {
        return this.value.equals(other.value);
    }
}
export{PaymentId}