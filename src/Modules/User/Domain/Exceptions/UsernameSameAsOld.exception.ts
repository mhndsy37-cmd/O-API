import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class UsernameSameAsOldException extends DomainException{
    readonly code = 'USER_INVALID_USERNAME';
    constructor() {
        super("USER_INVALID_USERNAME:Same-as-old");
    }

}
export{UsernameSameAsOldException}