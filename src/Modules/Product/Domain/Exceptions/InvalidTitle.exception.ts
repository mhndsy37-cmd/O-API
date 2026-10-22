import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';
enum ErrorTitleReason{
    TOO_LONG="Too-long"
    ,TOO_SHORT="Too-short"
}
class InvalidTitleException extends DomainException {
    readonly code = 'PRODUCT_INVALID_TITLE';
    constructor(reason?: ErrorTitleReason) {
        super(reason? `PRODUCT_INVALID_TITLE:${reason}`:"PRODUCT_INVALID_TITLE");
    }
}
export{InvalidTitleException,ErrorTitleReason}