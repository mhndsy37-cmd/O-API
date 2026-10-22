import { ProductResponseDto } from './ProductResponse.dto.js';

class ProductListResponseDto {
    data!: ProductResponseDto[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
export{ProductListResponseDto}