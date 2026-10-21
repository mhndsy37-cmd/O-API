import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
import { UserStatus } from "../Enums/Status.enum.js";

class UserCannotBeModifiedException extends DomainException{
    readonly code = 'USER_INVALID_STATUS';
    constructor(reason:string) {
        super(reason);
    }
    static ex(reason:UserStatus){
        const base = 'USER_INVALID_STATUS';
        //if reason have value, massage has base:reason value else massage is base
        return new UserCannotBeModifiedException(reason ? `${base}: ${reason}` : base);
    }

}
export{UserCannotBeModifiedException}