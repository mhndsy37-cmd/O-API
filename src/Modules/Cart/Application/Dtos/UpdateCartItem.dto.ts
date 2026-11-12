import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateCartItemDto {
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
export { UpdateCartItemDto }