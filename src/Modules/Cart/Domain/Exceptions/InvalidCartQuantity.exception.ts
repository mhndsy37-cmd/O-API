import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
class InvalidCartQuantityException extends DomainException{
    readonly code="CART_INVALID_QUANTITY"
    constructor(){
        super("CART_INVALID_QUANTITY:Invlaid-qty-item")
    }
}
export{InvalidCartQuantityException}