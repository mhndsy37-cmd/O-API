import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { PaymentGateway } from '../../Domain/Enums/PaymentGateway.enum.js';

class InitiatePaymentDto {
    @IsString()
    @IsNotEmpty()
    orderId!: string;

    @IsNumber()
    @Min(1000, { message: 'The amount must be at least 1,000 Tomans.' })
    amount!: number;

    @IsEnum(PaymentGateway)
    @IsNotEmpty()
    gateway!: PaymentGateway;
}
export{InitiatePaymentDto}