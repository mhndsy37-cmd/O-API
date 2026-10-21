import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class CannotChangeOwnRoleException extends DomainException{
    readonly code = 'USER_INVALID_ROLE';
    constructor() {
        super("USER_INVALID_ROLE:can-not-change-yourself");
    }
}
export{CannotChangeOwnRoleException}