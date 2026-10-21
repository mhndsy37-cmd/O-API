import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class PasswordSameAsOldException extends DomainException{
    readonly code = 'USER_INVALID_PASSWORD';
    constructor() {
        super("USER_INVALID_PASSWORD:Same-as-Old");
    }
}
export{PasswordSameAsOldException}