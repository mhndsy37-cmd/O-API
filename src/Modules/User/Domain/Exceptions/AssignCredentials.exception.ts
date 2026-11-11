import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class AssignCredentialsException extends DomainException{
    readonly code = 'USER_CREDENTIALS_ALREADY_ASSIGNED';
    constructor() {
        super("USER_CREDENTIALS_ALREADY_ASSIGNED:This-user-already-has-login-credentials.");
    }
    

}
export{AssignCredentialsException}