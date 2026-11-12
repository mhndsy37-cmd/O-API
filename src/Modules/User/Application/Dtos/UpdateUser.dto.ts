import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

class UpdateUserDto {
    @ApiProperty({ description: 'Username for Update User', example: 'ali_ahmadi' })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    username?: string
    @ApiProperty({ description: 'Fullname for Update User', example: 'Ali Ahmadi' })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    fullname?: string
}
export { UpdateUserDto }