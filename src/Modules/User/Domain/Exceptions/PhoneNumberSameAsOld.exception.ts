import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class PhoneNumberSameAsOldException extends DomainException{
    readonly code = 'USER_INVALID_PHONENUMBER';
    constructor() {
        super("USER_INVALID_PHONENUMBER:Same-as-Old");
    }
}
export{PhoneNumberSameAsOldException}