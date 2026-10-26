import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, Min, IsOptional, Max} from 'class-validator';

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
    @IsNumber()
    @Max(20)
    @Min(0)
    maxPurchaseLimit!:number;
    @IsOptional()
    categoryId!: string
}
export { CreateProductDto }