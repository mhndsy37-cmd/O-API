import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class VerifyPaymentDto {
    @ApiProperty({ description: 'authority for verify Payment', example: 'ds78ds9d' })
    @IsString()
    @IsNotEmpty()
    authority!: string;
}
export { VerifyPaymentDto }