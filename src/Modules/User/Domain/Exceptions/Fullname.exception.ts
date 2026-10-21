//import from shared/exception
import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
enum FullnameErrorReason {
    TOO_LONG="max-length",
    TOO_SHORT="min-length",
    INVALID_CHARS="characters",
    REQUIRED = 'required'
}
class InvalidFullnameException extends DomainException {
    readonly code = 'USER_INVALID_FULLNAME';
    private constructor(reason: string) {
        super(reason);
    }
    static ex(reason: string): InvalidFullnameException {
        const base = 'USER_INVALID_FULLNAME';
        //if reason have value, massage has base:reason value else massage is base
        return new InvalidFullnameException(reason ? `${base}: ${reason}` : base);
    }

}
//export for ../value-object/Fullname.vo.ts
export {InvalidFullnameException, FullnameErrorReason }