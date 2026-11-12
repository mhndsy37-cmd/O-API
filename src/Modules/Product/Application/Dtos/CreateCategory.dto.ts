import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

class CreateCategoryDto {
    @ApiProperty({ description: 'name for Create Category', example: 'Books' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name!: string;
    @ApiProperty({ description: 'slug for Create Category', example: 'book' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    slug!: string;
    @ApiProperty({ description: 'parentId for Create Category', example: '40d5ecb8b395d7g01f3f8a12',required:false })
    @IsOptional()
    @IsString()
    parentId?: string | undefined;
    @ApiProperty({ description: 'description for Create Category', example: 'roman Book',required:false })
    @IsOptional()
    @IsString()
    description?: string | undefined;
}
export { CreateCategoryDto }