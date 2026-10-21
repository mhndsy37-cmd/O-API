//import from shared/exception
import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
enum UsernameErrorReason {
    TOO_LONG = "MaxLength",
    TOO_SHORT = "MinLength",
    INVALID_CHARS = "Characters",
    REQUIRED = 'Required',
    EXISTS = "Exists"
}
class InvalidUsernameException extends DomainException {
    readonly code = 'USER_INVALID_USERNAME';
    private constructor(reason: string) {
        super(reason);
    }
    static ex(reason: string,token?:string): InvalidUsernameException {
        const base = 'USER_INVALID_USERNAME';
        //if reason have value, massage has base:reason value else massage is base
        if (reason === UsernameErrorReason.EXISTS) {
            return new InvalidUsernameException(`${base}:${reason}-with:"${token}"`);
        }
        return new InvalidUsernameException(reason ? `${base}: ${reason}` : base);
    }

}
//export for ../value-object/Username.vo.ts
export { InvalidUsernameException, UsernameErrorReason }