import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';

class MaxUploadImagesException extends DomainException {
    readonly code = 'PRODUCT_INVALID_IMAGE';
    constructor() {
        super("PRODUCT_INVALID_IMAGE:Max-upload");
    }
}
export{MaxUploadImagesException}