import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class FullnameSameAsOldException extends DomainException{
    readonly code = 'USER_INVALID_FULLNAME';
    constructor() {
        super("USER_INVALID_FULLNAME:Same-as-Old");
    }
    

}
export{FullnameSameAsOldException}