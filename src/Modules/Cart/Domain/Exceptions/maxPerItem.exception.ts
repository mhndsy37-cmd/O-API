import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
class maxPerItemException extends DomainException{
    readonly code="CART_INVALID_QUANTITY:maxPerItemException"
    constructor(maxProp:number){
        super(`CART_INVALID_QUANTITY:maxReq:${maxProp}`)
    }
}
export{maxPerItemException}