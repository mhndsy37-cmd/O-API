import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';
class ForbiddenException extends DomainException {
    readonly code = 'PRODUCT_INVALID_ACCESS';
    constructor() {
        super('PRODUCT_INVALID_ACCESS');
    }
}
export{ForbiddenException}