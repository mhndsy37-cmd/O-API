//import from shared/exception
import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
enum EmailErrorReason {
    TOO_LONG="Max-length",
    INVALID_CHARS="Characters",
    REQUIRED = 'Required',
    EXISTS="Exists"
}
class InvalidEmailException extends DomainException {
    readonly code = 'USER_INVALID_EMAIL';
    private constructor(reason: string) {
        super(reason);
    }
    static ex(reason?: string,token?:string): InvalidEmailException {
        const base = 'USER_INVALID_EMAIL';
        //if reason have value, massage has base:reason value else massage is base
        if(reason===EmailErrorReason.EXISTS){
            return new InvalidEmailException(`${base}:${reason}-with:"${token}"`);
        }
        return new InvalidEmailException(reason ? `${base}: ${reason}` : base);
    }

}
//export for ../value-object/Email.vo.ts
export {InvalidEmailException, EmailErrorReason }