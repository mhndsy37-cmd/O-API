import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

class UserNotFoundExceptionEP extends DomainException{
    readonly code = 'USER_INVALID_EMAIL';
    constructor(token:string) {
        super(`USER_INVALID_EMAIL:${token}-is-not-found`);
    }

}
export{UserNotFoundExceptionEP}