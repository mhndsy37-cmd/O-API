import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { PaymentGateway } from '../../Domain/Enums/PaymentGateway.enum.js';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../Domain/Enums/PaymentStatus.enum.js';

class InitiatePaymentDto {
    @ApiProperty({ description: 'order id for Initiate Payment', example: '10d543k8b392d7001r5f8a12' })
    @IsString()
    @IsNotEmpty()
    orderId!: string;
    @ApiProperty({ description: 'amount for Initiate Payment', example: 500000 })
    @IsNumber()
    @Min(1000, { message: 'The amount must be at least 1,000 Tomans.' })
    amount!: number;
    @ApiProperty({ description: 'gateway for Initiate Payment', example: PaymentStatus.SUCCESS,enum:PaymentGateway })
    @IsEnum(PaymentGateway)
    @IsNotEmpty()
    gateway!: PaymentGateway;
}
export { InitiatePaymentDto }