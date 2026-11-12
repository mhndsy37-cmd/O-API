import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength, MinLength, Min, Max } from 'class-validator';

class UpdateProductDto {
    // prop
    @ApiProperty({ description: 'title for Update Product', example: 'Book opw', required: false })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(150)
    title?: string;

    // prop
    @ApiProperty({ description: 'description for Update Product', example: 'Book opw for lern', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    // prop
    @ApiProperty({ description: 'author for Update Product', example: 'George Orwell', required: false })
    @IsOptional()
    @IsString()
    author?: string; 

    // prop
    @ApiProperty({ description: 'price for Update Product', example: 250000, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    // prop
    @ApiProperty({ description: 'stock for Update Product', example: 500, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;

    // prop
    @ApiProperty({ description: 'maxPurchaseLimit for Update Product', example: 10, required: false })
    @IsOptional()
    @IsNumber()
    @Min(1) 
    @Max(20)
    maxPurchaseLimit?: number;
}
export { UpdateProductDto }