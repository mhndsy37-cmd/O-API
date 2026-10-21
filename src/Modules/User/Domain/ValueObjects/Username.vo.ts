import { InvalidUsernameException, UsernameErrorReason } from "../Exceptions/Username.exception.js";
class Username {
    private static readonly MIN_LENGTH = 5;
    private static readonly MAX_LENGTH = 30;
    private static readonly VALID_REGEX = /^[a-zA-Z0-9_]+$/;
    private constructor(private readonly value: string) { }
    static create(value: string): Username {
        if (value.length < this.MIN_LENGTH) {
            throw InvalidUsernameException.ex(UsernameErrorReason.TOO_SHORT)
        }
        if (value.length > this.MAX_LENGTH) {
            throw InvalidUsernameException.ex(UsernameErrorReason.TOO_LONG)
        }
        if (!this.VALID_REGEX.test(value)) {
            throw InvalidUsernameException.ex(UsernameErrorReason.INVALID_CHARS)
        }
        return new Username(value)
    }
    changeUsername(newUsername: Username): string {
        if (!newUsername || newUsername.value.length < 3) {
            throw new Error("")
        }
        return newUsername.value
    }
    getValue(): string {
        return this.value;
    }
    equals(other: Username): boolean {
        return this.value === other.value;
    }
    toString(): string {
        return this.value;
    }
}
export {Username}