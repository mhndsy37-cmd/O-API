import { Cart } from '../Entities/Cart.entity.js';

interface ICartRepository {
    findByUserId(userId: string): Promise<Cart | null>;
    save(cart: Cart): Promise<void>;
    delete(userId: string): Promise<void>;
}
export{ICartRepository}