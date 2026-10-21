//import from shared/exception
import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
class InvalidUseridException extends DomainException {
    readonly code = 'USER_INVALID_USERID';
    constructor() {
        super('USER_INVALID_USERID');
    }
}
export {InvalidUseridException }