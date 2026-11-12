import { ApiProperty } from '@nestjs/swagger'; // add
import { ProductStatus } from '../../Domain/Enums/ProductStatus.enum.js';

class ProductResponseDto {
    // prop
    @ApiProperty({ description: 'Product ID', example: '60d5ecb8b392d7001f3f8a12' })
    id!: string;

    // prop
    @ApiProperty({ description: 'Product title', example: '1984' })
    title!: string;

    // prop
    @ApiProperty({ description: 'Product description', example: 'A dystopian novel.' })
    description!: string;

    // prop
    @ApiProperty({ description: 'Seller name', example: 'Ali Ahmadi' })
    sellerName!: string;

    // prop
    @ApiProperty({ description: 'Seller ID', example: '60d5ecb8b392d7001f3f8a13' })
    sellerId!: string;

    // prop
    @ApiProperty({ description: 'Product price', example: 200000 })
    price!: number;

    // prop
    @ApiProperty({ description: 'Stock quantity', example: 50 })
    stock!: number;

    // prop
    @ApiProperty({ description: 'Maximum purchase limit per user', example: 10 })
    maxPurchaseLimit!: number;

    // prop
    @ApiProperty({ 
        description: 'Product images', 
        type: () => [String], 
        example: ['/uploads/product-1.jpg', '/uploads/product-2.jpg'] 
    })
    images!: string[];

    // prop
    @ApiProperty({ 
        description: 'Product status', 
        enum: ProductStatus, 
        example: ProductStatus.PUBLISHED 
    })
    status!: ProductStatus;

    // prop
    @ApiProperty({ description: 'Created at', example: '2026-11-11T20:37:46.578Z' })
    createdAt!: Date;

    // prop
    @ApiProperty({ 
        description: 'Updated at', 
        example: '2026-11-12T10:00:00.000Z', 
        required: false, 
        nullable: true 
    })
    updatedAt?: Date;
}
export { ProductResponseDto }