import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';
enum ErrorIdReason{
    FORMAT="Format"
}
class InvalidIdException extends DomainException {
    readonly code = 'PRODUCT_INVALID_ID';
    constructor(reason?:ErrorIdReason) {
        super(reason?'PRODUCT_INVALID_ID':`PRODUCT_INVALID_STOCK:${reason}`);
    }
}
export{InvalidIdException,ErrorIdReason}