import { ObjectId } from "bson";
import { ErrorOrderIdReason, InvalidOrderIdException } from "../Exceptions/InvalidOrderId.exception.js";

class OrderId {
    private constructor(private readonly value: ObjectId) {}

    static generate(): OrderId {
        return new OrderId(new ObjectId());
    }

    static createFromPlain(value: string): OrderId {
        if (!value || !ObjectId.isValid(value)) {
            throw new InvalidOrderIdException(ErrorOrderIdReason.FORMAT);
        }
        return new OrderId(new ObjectId(value));
    }

    getValue(): ObjectId {
        return this.value;
    }

    toString(): string {
        return this.value.toString();
    }

    equals(other: OrderId): boolean {
        return this.value.equals(other.value);
    }
}
export{OrderId}