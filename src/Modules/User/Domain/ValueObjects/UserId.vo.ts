// modules/user/domain/value-objects/UserId.vo.ts
import { ObjectId } from "bson";
import { InvalidUseridException } from "../Exceptions/InvalidUserid.exception.js";

class UserId {
  private constructor(private readonly value: ObjectId) { }
  static generate(): UserId {
    return new UserId(new ObjectId());
  }
  static createFromPlain(value: string): UserId {
    if (!value || !ObjectId.isValid(value)) {
      throw new InvalidUseridException();
    }
    return new UserId(new ObjectId(value));
  }
  getValue(): ObjectId {
    return this.value;
  }
  toString(): string {
    return this.value.toHexString();
  }
  equals(other: UserId): boolean {
    return this.value.equals(other.value);
  }
}
export { UserId }