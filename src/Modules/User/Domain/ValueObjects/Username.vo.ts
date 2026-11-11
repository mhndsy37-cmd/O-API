import { InvalidUsernameException, UsernameErrorReason } from "../Exceptions/Username.exception.js";

class Username {
    private static readonly MIN_LENGTH = 5;
    private static readonly MAX_LENGTH = 30;
    private static readonly VALID_REGEX = /^[a-zA-Z0-9_]+$/;

    private constructor(private readonly value: string) { }

    static create(value: string | null | undefined): Username | null {
        if (!value || value.trim().length === 0) {
            return null; 
        }

        const trimmed = value.trim();
        
        if (trimmed.length < this.MIN_LENGTH) {
            throw InvalidUsernameException.ex(UsernameErrorReason.TOO_SHORT);
        }
        if (trimmed.length > this.MAX_LENGTH) {
            throw InvalidUsernameException.ex(UsernameErrorReason.TOO_LONG);
        }
        if (!this.VALID_REGEX.test(trimmed)) {
            throw InvalidUsernameException.ex(UsernameErrorReason.INVALID_CHARS);
        }
        
        return new Username(trimmed);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: Username | null): boolean {
        if (!other) return false;
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

export { Username };