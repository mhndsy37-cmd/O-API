import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class EmailSameAsOldException extends DomainException{
    readonly code = 'USER_INVALID_EMAIL';
    constructor() {
        super("USER_INVALID_EMAIL:Same-as-Old");
    }
    

}
export{EmailSameAsOldException}