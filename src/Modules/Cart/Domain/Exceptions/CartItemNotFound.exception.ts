import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';

class CartItemNotFoundException extends DomainException {
    readonly code = 'CART_ITEM_NOT_FOUND';
    
    constructor(productId: string) {
        super(`CART_ITEM_NOT_FOUND:${productId}`);
    }
}
export{CartItemNotFoundException}