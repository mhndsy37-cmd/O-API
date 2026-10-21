import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class UserNotDeletedException extends DomainException{
    readonly code = 'USER_INVALID_STATUS';
    constructor() {
        super("USER_INVALID_STATUS:User-not-deleted");
    }

}
export{UserNotDeletedException}