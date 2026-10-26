import { IsNumber, IsOptional, IsString, MaxLength, MinLength, Min } from 'class-validator';

class UpdateProductDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(150)
    title?: string | undefined;

    @IsOptional()
    @IsString()
    description?: string | undefined;

    @IsOptional()
    @IsString()
    seller?: string | undefined;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number | undefined;

    @IsOptional()
    @IsNumber()
    stock?: number | undefined;

    @IsOptional()
    @IsNumber()
    maxPurchaseLimit!:number|undefined;
}
export{UpdateProductDto}