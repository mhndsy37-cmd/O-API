import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

class RestockProductDto {
    @ApiProperty({ description: 'Stock for increse Product amount', example: 10 })
    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: 'The number of charges must be at least 1.' })
    amount!: number;
}
export{RestockProductDto}