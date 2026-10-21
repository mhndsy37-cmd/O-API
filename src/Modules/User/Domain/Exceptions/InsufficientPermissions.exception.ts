import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class InsufficientPermissionsException extends DomainException{
    readonly code = 'USER_INVALID_ROLE';
     constructor() {
        super("USER_INVALID_ROLE:Access-defined");
    }

}
export{InsufficientPermissionsException}