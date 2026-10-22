import { ObjectId } from "bson";
import { ErrorIdReason, InvalidIdException } from "../Exceptions/InvalidId.exception.js";

class ProductId {
    private constructor(private readonly value: ObjectId) {}

    static generate(): ProductId {
        return new ProductId(new ObjectId());
    }

    static createFromPlain(value: string): ProductId {
        if (!value || !ObjectId.isValid(value)) {
            throw new InvalidIdException(ErrorIdReason.FORMAT);
        }
        return new ProductId(new ObjectId(value));
    }

    getValue(): ObjectId {
        return this.value;
    }

    toString(): string {
        return this.value.toHexString();
    }

    equals(other: ProductId): boolean {
        return this.value.equals(other.value);
    }
}
export{ProductId}