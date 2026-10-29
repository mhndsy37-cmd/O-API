import { DomainException } from "../../../../Shared/Exceptions/DomainException.js"

enum ErrorOrderIdReason{
    FORMAT="Format"
}
class InvalidOrderIdException extends DomainException{
    readonly code="ORDER_INVALID_ID"
    constructor(reason?:string){
        super(reason?`ORDER_INVALID_ID:${reason}`:"ORDER_INVALID_ID")
    }
}
export{InvalidOrderIdException,ErrorOrderIdReason}