//import from shared/exception
import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
enum PhonenumberErrorReason {
    INVALID_FORMAT="not-PhoneNumber",
    REQUIRED = 'required',
    EXISTS="Exists"
}
class InvalidPhonenumberException extends DomainException {
    readonly code = 'USER_INVALID_PHONENUMBER';
    private constructor(reason: string) {
        super(reason);
    }
    static ex(reason: string,token?:string): InvalidPhonenumberException {
        const base = 'USER_INVALID_PHONENUMBER';
        //if reason have value, massage has base:reason value else massage is base
         if(reason===PhonenumberErrorReason.EXISTS){
            return new InvalidPhonenumberException(`${base}:${reason}-with:"${token}"`);
        }
        return new InvalidPhonenumberException(reason ? `${base}: ${reason}` : base);
    }

}
//export for ../value-object/Phonenumber.vo.ts
export {InvalidPhonenumberException, PhonenumberErrorReason }