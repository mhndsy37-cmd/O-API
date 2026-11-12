import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class CheckoutDto {
    @ApiProperty({ description: 'shipping Address for check', example: 'tehran ss fsd dfs' })
    @IsString()
    @IsNotEmpty()
    shippingAddress!: string;
}
export { CheckoutDto }