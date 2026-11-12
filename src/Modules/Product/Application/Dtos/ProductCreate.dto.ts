import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, Min, Max } from 'class-validator';

class CreateProductDto {
    @ApiProperty({ description: 'title for Create Product', example: 'Book' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(150)
    title!: string;
    @ApiProperty({ description: 'description for Create Product', example: 'Book for lerning' })
    @IsString()
    @IsNotEmpty()
    description!: string;
    @ApiProperty({ description: 'Price for Create Product', example: 7900000 })
    @IsNumber()
    @Min(0)
    price!: number;
    @ApiProperty({ description: 'Stock for Create Product', example: 80 })
    @IsNumber()
    @Min(0)
    stock!: number;
    @ApiProperty({ description: 'max Purchase Limit for Create Product', example: 10 })
    @IsNumber()
    @Max(20)
    @Min(0)
    maxPurchaseLimit!: number;
    @ApiProperty({ description: 'categoryId for Create Product', example: "dsds79" ,required:false})
    @IsString()
    categoryId!: string
}
export { CreateProductDto }