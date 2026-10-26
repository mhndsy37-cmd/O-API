import { Cart } from '../../Domain/Entities/Cart.entity.js';
import { CartResponseDto } from '../Dtos/CartResponse.dto.js';
import { Product } from '../../../Product/Domain/Entities/Product.entity.js';

class CartResponseMapper {
    /**
     * @param cart
     * @param productsMap
     */
    static toResponse(cart: Cart, productsMap: Map<string, Product>): CartResponseDto {
        let totalPrice = 0;
        const itemsResponse = [];

        for (const item of cart.getItems()) {
            const product = productsMap.get(item.productId);
            if (!product) continue; 

            const itemTotal = product.getPrice().getValue() * item.getQuantity();
            totalPrice += itemTotal;

            itemsResponse.push({
                productId: item.productId,
                title: product.getTitle().getValue(),
                price: product.getPrice().getValue(),
                image: product.getImages()?.[0],
                quantity: item.getQuantity(),
                totalPrice: itemTotal,
            });
        }

        return {
            cartId: cart.getId(),
            userId: cart.getUserId(),
            items: itemsResponse,
            totalPrice,
        };
    }
}
export{CartResponseMapper}