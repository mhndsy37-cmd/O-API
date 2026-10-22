import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, Min, IsOptional } from 'class-validator';

class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(150)
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsNumber()
    @Min(0)
    stock!: number;
    @IsOptional()
    categoryId!: string
}
export { CreateProductDto }