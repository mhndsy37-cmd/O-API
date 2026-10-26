import { IsNotEmpty, IsNumber, Min } from 'class-validator';

class UpdateCartItemDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: 'The quantity must be at least 1.' })
    quantity!: number;
}
export{UpdateCartItemDto}