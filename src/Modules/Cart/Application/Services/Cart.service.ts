import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICartRepository } from '../../Domain/Repositories/Cart.repository.interface.js';
import { IProductRepository } from '../../../Product/Domain/Repositories/Product.repository.interface.js';
import { Cart } from '../../Domain/Entities/Cart.entity.js';
import { ProductId } from '../../../Product/Domain/ValueObjects/ProductId.vo.js';
import { CartResponseDto } from '../Dtos/CartResponse.dto.js';
import { AddToCartDto } from '../Dtos/AddToCart.dto.js';
import { UpdateCartItemDto } from '../Dtos/UpdateCartItem.dto.js';
import { CartResponseMapper } from '../Mapper/Cart.mapper.js';

@Injectable()
class CartService {
    constructor(
        @Inject('ICartRepository')
        private readonly cartRepository: ICartRepository,
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
    ) { }
    async addToCart(userId: string, dto: AddToCartDto): Promise<CartResponseDto> {
        const product = await this.productRepository.findById(ProductId.createFromPlain(dto.productId));
        if (!product) {
            throw new NotFoundException('product not found.');
        }

        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            cart = Cart.create(userId);
        }

        const currentQuantityInCart = cart.getItemQuantity(dto.productId);
        const totalRequestedQuantity = currentQuantityInCart + dto.quantity;

        if (product.getStock().getValue() < totalRequestedQuantity) {
            throw new BadRequestException(
                `not ${currentQuantityInCart} this products in db,qty: ${product.getStock().getValue()}`
            );
        }
        const maxLimit = product.getMaxPurchaseLimit();
        if (totalRequestedQuantity > maxLimit) {
            console.log(maxLimit)
            console.log(dto.quantity)
            throw new BadRequestException(
                `your req qty is ${totalRequestedQuantity} but max req qty is ${maxLimit}`
            );
        }
        cart.addItem(dto.productId, dto.quantity);
        await this.cartRepository.save(cart);
        const productsMap = new Map<string, any>();
        productsMap.set(product.getId().toString(), product);
        return CartResponseMapper.toResponse(cart, productsMap);
    }
    async getCart(userId: string): Promise<CartResponseDto> {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart || cart.getItems().length === 0) {
            return { cartId: '', userId, items: [], totalPrice: 0 };
        }
        const productsMap = new Map<string, any>();
        for (const item of cart.getItems()) {
            const product = await this.productRepository.findById(ProductId.createFromPlain(item.productId));
            if (product) {
                productsMap.set(item.productId, product);
            }
        }
        return CartResponseMapper.toResponse(cart, productsMap);
    }
    async updateQuantity(userId: string, productId: string, dto: UpdateCartItemDto): Promise<CartResponseDto> {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart) throw new NotFoundException('Shopping cart not found.');

        const product = await this.productRepository.findById(ProductId.createFromPlain(productId));
        if (!product || product.getStock().getValue() < dto.quantity) {
            throw new NotFoundException('Insufficient product stock.');
        }
        if (product.getStock().getValue() < dto.quantity) {
            throw new BadRequestException(
                `can not more get product,qty: ${product.getStock().getValue()}`
            );
        }
        const maxLimit = product.getMaxPurchaseLimit();
        if (dto.quantity > maxLimit) {
            
            throw new BadRequestException(`max item to add in cart:${maxLimit}`);
        }

        cart.updateItemQuantity(productId, dto.quantity);
        await this.cartRepository.save(cart);

        const productsMap = new Map<string, any>();
        productsMap.set(productId, product);

        return CartResponseMapper.toResponse(cart, productsMap);
    }
    async removeItem(userId: string, productId: string): Promise<CartResponseDto> {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart) throw new NotFoundException('Shopping cart not found.');

        cart.removeItem(productId);
        await this.cartRepository.save(cart);

        return this.getCart(userId);
    }
    async clearCart(userId: string): Promise<{ message: string }> {
        const cart = await this.cartRepository.findByUserId(userId);
        if (cart) {
            cart.clearCart();
            await this.cartRepository.save(cart);
        }
        return { message: 'Shopping cart successfully cleared.' };
    }
}
export { CartService }