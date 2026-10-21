import { InvalidFullnameException, FullnameErrorReason } from "../Exceptions/Fullname.exception.js";
class Fullname {
    private static readonly MIN_LENGTH = 3;
    private static readonly MAX_LENGTH = 30;
    private static readonly VALID_REGEX = /^[a-zA-Z\u0600-\u06FF\u200C\s]+$/;
    
    private constructor(private readonly value: string) { }
    static create(value: string): Fullname {
        if (value.length < this.MIN_LENGTH) {
            throw InvalidFullnameException.ex(FullnameErrorReason.TOO_SHORT)
        }
        if (value.length > this.MAX_LENGTH) {
            throw InvalidFullnameException.ex(FullnameErrorReason.TOO_LONG)
        }
        if (!this.VALID_REGEX.test(value)) {
            throw InvalidFullnameException.ex(FullnameErrorReason.INVALID_CHARS)
        }
        return new Fullname(value)
    }
    getValue(): string {
        return this.value;
    }
    equals(other: Fullname): boolean {
        return this.value === other.value;
    }
    toString(): string {
        return this.value;
    }
    
}
export {Fullname}