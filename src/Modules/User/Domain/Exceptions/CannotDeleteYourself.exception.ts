import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class CannotDeleteYourselfException extends DomainException{
    readonly code = 'USER_INVALID_STATUS';
    constructor() {
        super("USER_INVALID_STATUS:Can-not-delete-yourself");
    }
}
export{CannotDeleteYourselfException}