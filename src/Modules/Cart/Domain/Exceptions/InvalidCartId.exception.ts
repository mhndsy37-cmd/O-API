import { DomainException } from "../../../../Shared/Exceptions/DomainException.js"

enum ErrorCartIdReason{
    FORMAT="Format"
}
class InvalidCartIdException extends DomainException{
    readonly code="CART_INVALID_ID"
    constructor(reason?:string){
        super(reason?`CART_INVALID_ID:${reason}`:"CART_INVALID_ID")
    }
}
export{InvalidCartIdException,ErrorCartIdReason}