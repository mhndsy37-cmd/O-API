import { IsNotEmpty, IsString } from 'class-validator';

class CheckoutDto {
    @IsString()
    @IsNotEmpty()
    shippingAddress!: string; 
}
export{CheckoutDto}