import { ApiProperty } from '@nestjs/swagger'; // add
import { ProductResponseDto } from './ProductResponse.dto.js';

class ProductListResponseDto {
    // prop
    @ApiProperty({ 
        description: 'List of products', 
        type: () => [ProductResponseDto] 
    })
    data!: ProductResponseDto[];

    // prop
    @ApiProperty({ description: 'Total number of products', example: 150 })
    total!: number;

    // prop
    @ApiProperty({ description: 'Current page number', example: 1 })
    page!: number;

    // prop
    @ApiProperty({ description: 'Number of items per page', example: 10 })
    limit!: number;

    // prop
    @ApiProperty({ description: 'Total number of pages', example: 15 })
    totalPages!: number;
}
export { ProductListResponseDto }