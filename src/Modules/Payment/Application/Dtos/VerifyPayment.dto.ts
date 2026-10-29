import { IsNotEmpty, IsString } from 'class-validator';

class VerifyPaymentDto {
    @IsString()
    @IsNotEmpty()
    authority!: string;
}
export{VerifyPaymentDto}