import { EmailErrorReason, InvalidEmailException } from "../Exceptions/Email.exception.js"
type o = RegExpMatchArray
class Email {
    private static readonly VALID_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    private static readonly MAX_LENGTH = 254
    private readonly MATCHING = /^(?<name>[^@\s]+)@(?<domain>[^@\s]+\.[^@\s]+)$/
    private constructor(private readonly value: string) { }
    static create(value: string): Email {
        const normaled: string = value.trim().toLowerCase() ?? ""
        if (!normaled) {
            throw InvalidEmailException.ex(EmailErrorReason.REQUIRED)
        }
        if (value.length > this.MAX_LENGTH) {
            throw InvalidEmailException.ex(EmailErrorReason.TOO_LONG)
        }
        if (!this.VALID_EMAIL.test(value)) {
            throw InvalidEmailException.ex(EmailErrorReason.INVALID_CHARS)
        }
        return new Email(value)
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
    getDomain() {
        const matched = this.value.match(this.MATCHING)
        if (matched === null) return null
        return matched[2]
    }
    getName():string|null{
        const matched = this.value.match(this.MATCHING)
        if (!matched) return null
        return matched[1]??null
    }
}
export { Email }