import { DomainException } from "../../../../Shared/Exceptions/DomainException.js"

class AlreadySuccessfullyException extends DomainException{
    readonly code="PAYMENT_INVALID_SUCCESSPAY"
    constructor(reason?:string){
        super(reason?`PAYMENT_INVALID_SUCCESSPAY:${reason}`:"PAYMENT_INVALID_SUCCESSPAY")
    }
}
export{AlreadySuccessfullyException}