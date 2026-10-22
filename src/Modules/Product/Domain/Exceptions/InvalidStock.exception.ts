import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';
enum ErrorStockReason{
    NEGATIVE="Negative",
    NOT_AVAILABLE_ENOUGH="Not-available-enough"
}
class InvalidStockException extends DomainException {
    readonly code = 'PRODUCT_INVALID_STOCK ';
    constructor(reason?:ErrorStockReason) {
        super(reason?'PRODUCT_INVALID_STOCK':`PRODUCT_INVALID_STOCK:${reason}`);
    }
}
export{InvalidStockException,ErrorStockReason}