import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

class ChangePasswordDto {
    // prop
    @ApiProperty({ 
        description: 'Current password for verification', 
        example: 'MyP@ssw0rd' 
    }) 
    @IsString()
    @IsNotEmpty()
    currentPassword!: string;

    // prop
    @ApiProperty({ 
        description: 'New password', 
        example: 'NewMyP@ssw0rd' 
    }) 
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    newPassword!: string;
}
export { ChangePasswordDto }