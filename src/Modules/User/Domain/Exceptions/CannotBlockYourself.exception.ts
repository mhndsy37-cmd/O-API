import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class CannotBlockYourselfException extends DomainException{
    readonly code = 'USER_INVALID_STATUS';
    constructor() {
        super("USER_INVALID_STATUS:Can-not-block-yourself");
    }
}
export{CannotBlockYourselfException}