import { DomainException } from "../../../../Shared/Exceptions/DomainException.js"

class OnlyTransactionsPendingException extends DomainException{
    readonly code="PAYMENT_INVALID_CANNOTPAY"
    constructor(reason?:string){
        super(reason?`PAYMENT_INVALID_CANNOTPAY:${reason}`:"PAYMENT_INVALID_CANNOTPAY")
    }
}
export{OnlyTransactionsPendingException}