import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

class AddToCartDto {
    @IsMongoId({ message: 'The Product Id is Invalid.' })
    @IsNotEmpty()
    productId!: string;

    @IsNumber()
    @Min(1, { message: 'The quantity must be at least 1.' })
    quantity!: number;
}
export{AddToCartDto}