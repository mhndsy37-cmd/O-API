import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class ChangeEmailDto {
    // prop
    @ApiProperty({ 
        description: 'New email address', 
        example: 'new_ali@test.com' 
    }) 
    @IsEmail()
    @IsNotEmpty()
    newEmail!: string;

    // prop
    @ApiProperty({ 
        description: 'Current password for verification', 
        example: 'MyP@ssw0rd' 
    }) 
    @IsString()
    @IsNotEmpty()
    password!: string;
}
export { ChangeEmailDto }