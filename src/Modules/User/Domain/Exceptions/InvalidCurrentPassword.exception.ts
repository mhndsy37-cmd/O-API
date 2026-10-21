//import from shared/exception
import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
class InvalidCurrentPasswordException extends DomainException {
    readonly code = 'USER_INVALID_PASSWORD';
    constructor() {
        super("USER_INVALID_PASSWORD:Invalid-current-password");
    }
}
export {InvalidCurrentPasswordException }