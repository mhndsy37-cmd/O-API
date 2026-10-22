import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class UserNotFoundException extends DomainException{
    readonly code = 'USER_INVALID';
    constructor(reason?:string) {
        super(reason?`USER_INVALID:User-"${reason}"-not-found`:`USER_INVALID:User-not-found`);
    }

}
export{UserNotFoundException}