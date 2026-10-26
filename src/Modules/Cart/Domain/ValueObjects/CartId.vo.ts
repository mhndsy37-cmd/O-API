import { ObjectId } from "bson";
import { ErrorCartIdReason, InvalidCartIdException } from "../Exceptions/InvalidCartId.exception.js";

class CartId {
    private constructor(private readonly value: ObjectId) {}

    static generate(): CartId {
        return new CartId(new ObjectId());
    }

    static createFromPlain(value: string): CartId {
        if (!value || !ObjectId.isValid(value)) {
            throw new InvalidCartIdException(ErrorCartIdReason.FORMAT);
        }
        return new CartId(new ObjectId(value));
    }

    getValue(): ObjectId {
        return this.value;
    }

    toString(): string {
        return this.value.toHexString();
    }

    equals(other: CartId): boolean {
        return this.value.equals(other.value);
    }
}
export{CartId}