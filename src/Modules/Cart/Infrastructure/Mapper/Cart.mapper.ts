import { CartDocument } from '../Schemas/Cart.schema.js';
import { Cart } from '../../Domain/Entities/Cart.entity.js';
import { CartId } from '../../Domain/ValueObjects/CartId.vo.js';
import { CartItem } from '../../Domain/ValueObjects/CartItem.vo.js';

class CartInfrastructureMapper {
    static toDomain(doc: CartDocument): Cart {
        const items = doc.items.map(i => CartItem.create(i.productId, i.quantity));

        return Cart.restore({
            id: CartId.createFromPlain(doc._id.toString()),
            userId: doc.userId,
            items,
            createdAt: doc.createdAt || new Date(),
            updatedAt: doc.updatedAt || new Date(),
        });
    }
    static toPersistence(cart: Cart): any {
        return {
            userId: cart.getUserId(),
            items: cart.getItems().map(item => ({
                productId: item.productId,
                quantity: item.getQuantity()
            })),
            updatedAt: new Date()
        };
    }
}
export{CartInfrastructureMapper}