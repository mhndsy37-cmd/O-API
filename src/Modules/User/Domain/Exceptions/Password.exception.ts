//import from shared/exception
import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
enum PasswordErrorReason {
    TOO_LONG="max-length",
    TOO_SHORT="min-length",
    INVALID_CHARS="characters",
    REQUIRED = 'required',
    WEAK="weak"
}
class InvalidPasswordException extends DomainException {
    readonly code = 'USER_INVALID_PASSWORD';
    private constructor(reason: string) {
        super(reason);
    }
    static ex(reason: string): InvalidPasswordException {
        const base = 'USER_INVALID_PASSWORD';
        //if reason have value, massage has base:reason value else massage is base
        return new InvalidPasswordException(reason ? `${base}: ${reason}` : base);
    }

}
//export for ../value-object/Password.vo.ts
export {InvalidPasswordException, PasswordErrorReason }