import { EmailErrorReason, InvalidEmailException } from "../Exceptions/Email.exception.js";

class Email {
    private static readonly EMAIL_REGEX = /^(?<name>[a-zA-Z0-9._%+-]+)@(?<domain>[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    private static readonly MAX_LENGTH = 254;

    private constructor(private readonly value: string) { }

    static create(value: string | null): Email {
        if (!value) {
            throw InvalidEmailException.ex(EmailErrorReason.REQUIRED);
        }

        const normaled: string = value.trim().toLowerCase(); 

        if (normaled.length > Email.MAX_LENGTH) {
            throw InvalidEmailException.ex(EmailErrorReason.TOO_LONG);
        }

        if (!Email.EMAIL_REGEX.test(normaled)) {
            throw InvalidEmailException.ex(EmailErrorReason.INVALID_CHARS);
        }

        return new Email(normaled);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: Email): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    getDomain(): string | null {
        const matched = this.value.match(Email.EMAIL_REGEX);
        if (!matched || !matched.groups) return null;
        return matched.groups.domain ?? null; 
    }

    getName(): string | null {
        const matched = this.value.match(Email.EMAIL_REGEX);
        if (!matched || !matched.groups) return null;
        return matched.groups.name ?? null;
    }
}

export { Email };