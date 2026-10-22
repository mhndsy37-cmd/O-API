import { IsNotEmpty, IsNumber, Min } from 'class-validator';

class RestockProductDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: 'The number of charges must be at least 1.' })
    amount!: number;
}
export{RestockProductDto}