import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';
enum ErrorPriceReason{
    NEGATIVE="NEGATIVE",

}
class InvalidPriceException extends DomainException {
    readonly code = 'PRODUCT_INVALID_PRICE';
    constructor(reason?:ErrorPriceReason) {
        super(reason?'PRODUCT_INVALID_PRICE':`PRODUCT_INVALID_PRICE:${reason}`);
    }
}
export{InvalidPriceException,ErrorPriceReason}