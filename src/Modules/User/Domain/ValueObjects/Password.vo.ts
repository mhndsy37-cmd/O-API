import { InvalidPasswordException, PasswordErrorReason } from '../Exceptions/Password.exception.js';
import { hashPassword, comparePassword } from '../../../../Shared/Utils/Hash.util.js';

class Password {
    private static readonly MAX_LENGTH = 64;
    private static readonly MIN_LENGTH = 8;
    private static readonly REGEX_VALID = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/;

    private constructor(private readonly value: string) { }

    static async create(value: string | null): Promise<Password> {
        const plainPassword = value?.trim();
        
        if (!plainPassword) {
            throw InvalidPasswordException.ex(PasswordErrorReason.REQUIRED);
        }
        if (plainPassword.length < Password.MIN_LENGTH) {
            throw InvalidPasswordException.ex(PasswordErrorReason.TOO_SHORT);
        }
        if (plainPassword.length > Password.MAX_LENGTH) {
            throw InvalidPasswordException.ex(PasswordErrorReason.TOO_LONG);
        }
        if (!Password.REGEX_VALID.test(plainPassword)) {
            throw InvalidPasswordException.ex(PasswordErrorReason.WEAK);
        }

        const hashed = await hashPassword(plainPassword);
        return new Password(hashed);
    }

    static createFromHash(hashedPassword: string): Password {
        if (!hashedPassword || hashedPassword.trim().length === 0) {
            throw InvalidPasswordException.ex(PasswordErrorReason.REQUIRED);
        }
        return new Password(hashedPassword);
    }

    async compare(plainPassword: string): Promise<boolean> {
        return comparePassword(plainPassword, this.value);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: Password): boolean {
        return this.value === other.value;
    }
}

export { Password };