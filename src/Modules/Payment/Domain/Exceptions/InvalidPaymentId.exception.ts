import { DomainException } from "../../../../Shared/Exceptions/DomainException.js"

enum ErrorPaymentIdReason{
    FORMAT="Format"
}
class InvalidPaymentIdException extends DomainException{
    readonly code="PAYMENT_INVALID_ID"
    constructor(reason?:string){
        super(reason?`PAYMENT_INVALID_ID:${reason}`:"PAYMENT_INVALID_ID")
    }
}
export{InvalidPaymentIdException,ErrorPaymentIdReason}