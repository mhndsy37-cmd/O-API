import { DomainException } from "../../../../Shared/Exceptions/DomainException.js"

enum ErrorOrderStatusReason{
    PENDING_TO_PAID="only can pending to paid",
    PAID_TO_PROCESSING="only can paid to processing",
    PROCESSING_TO_SHIPPED="only can processing to shipped",
    SHIPPED_TO_DELIVERED="only can shipped to delivered",
    TO_CANCEL="can not on delivered and canceled status, change status to CANCELED"
}
class InvalidOrderStatusException extends DomainException{
    readonly code="ORDER_INVALID_STATUS"
    constructor(reason:ErrorOrderStatusReason){
        super(`ORDER_INVALID_STATUS:${reason}`)
    }
}
export{InvalidOrderStatusException,ErrorOrderStatusReason}