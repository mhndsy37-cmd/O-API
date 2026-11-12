import { ApiProperty } from '@nestjs/swagger';

class CartItemResponseDto {
    // prop
    @ApiProperty({ description: 'Product ID', example: '60d5ecb8b392d7001f3f8a12' })
    productId!: string;

    // prop
    @ApiProperty({ description: 'Product title', example: '1984' })
    title!: string;

    // prop
    @ApiProperty({ description: 'Product price', example: 150000 })
    price!: number;

    // prop
    @ApiProperty({ 
        description: 'Product image', 
        example: '/uploads/product-123.jpg', 
        required: false, 
        nullable: true 
    })
    image?: string | undefined;

    // prop
    @ApiProperty({ description: 'Quantity', example: 2 })
    quantity!: number;

    // prop
    @ApiProperty({ description: 'Total price for this item', example: 300000 })
    totalPrice!: number;
}

class CartResponseDto {
    // prop
    @ApiProperty({ description: 'Cart ID', example: '65a2b3c4d5e6f7a8b9c0d1e2' })
    cartId!: string;

    // prop
    @ApiProperty({ description: 'User ID', example: '60d5ecb8b392d7001f3f8a12' })
    userId!: string;

    // prop
    @ApiProperty({ 
        description: 'Cart items', 
        type: () => [CartItemResponseDto]
    })
    items!: CartItemResponseDto[];

    // prop
    @ApiProperty({ description: 'Total cart price', example: 300000 })
    totalPrice!: number;
}

export { CartItemResponseDto, CartResponseDto }