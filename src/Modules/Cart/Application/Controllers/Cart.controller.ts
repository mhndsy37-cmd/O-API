import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Inject } from '@nestjs/common';
import { CartService } from '../Services/Cart.service.js';
import { AddToCartDto } from '../Dtos/AddToCart.dto.js';
import { UpdateCartItemDto } from '../Dtos/UpdateCartItem.dto.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';
import { GetUser } from '../../../../Shared/Decorators/GetUser.decorator.js';

@UseGuards(JwtAuthGuard)
@Controller('cart')
class CartController {
    constructor(
        @Inject(CartService) private readonly cartService: CartService
    ) {}

    @Get()
    async getCart(@GetUser('sub') userId: string) {
        return this.cartService.getCart(userId);
    }

    @Post('items')
    async addToCart(@GetUser('sub') userId: string, @Body() dto: AddToCartDto) {
        return this.cartService.addToCart(userId, dto);
    }

    @Patch('items/:productId')
    async updateQuantity(
        @GetUser('sub') userId: string,
        @Param('productId') productId: string,
        @Body() dto: UpdateCartItemDto,
    ) {
        return this.cartService.updateQuantity(userId, productId, dto);
    }

    @Delete('items/:productId')
    async removeItem(
        @GetUser('sub') userId: string,
        @Param('productId') productId: string,
    ) {
        return this.cartService.removeItem(userId, productId);
    }

    @Delete()
    async clearCart(@GetUser('sub') userId: string) {
        return this.cartService.clearCart(userId);
    }
}
export{CartController}