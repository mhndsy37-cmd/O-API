import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    slug!: string;

    @IsOptional()
    @IsString()
    parentId?: string | undefined;

    @IsOptional()
    @IsString()
    description?: string | undefined;
}
export{CreateCategoryDto}