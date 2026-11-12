import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // add

class AddToCartDto {
    // prop
    @ApiProperty({ 
        description: 'Product ID', 
        example: '60d5ecb8b392d7001f3f8a12' 
    })
    @IsMongoId({ message: 'The Product Id is Invalid.' })
    @IsNotEmpty()
    productId!: string;

    // prop
    @ApiProperty({ 
        description: 'Quantity', 
        example: 2, 
        minimum: 1 
    })
    @IsNumber()
    @Min(1, { message: 'The quantity must be at least 1.' })
    quantity!: number;
}
export { AddToCartDto }