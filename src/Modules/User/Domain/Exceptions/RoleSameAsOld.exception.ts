import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class RoleSameAsOldException extends DomainException{
    readonly code = 'USER_INVALID_ROLE';
    constructor() {
        super("USER_INVALID_ROLE:Same-as-Old");
    }
}
export{RoleSameAsOldException}