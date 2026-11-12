import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

class LoginWithPhonePasswordDto {
    @ApiProperty({ description: 'Login with Phone number', example: '09123456789' }) 
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\+98|0098|98|0)?9[0-9]{9}$/, { message: "Invalid Phone Number" })
    phoneNumber!: string;
    @ApiProperty({ description: 'Password', example: 'MyP@ssw0rd' }) 
    @IsString()
    @IsNotEmpty()
    password!: string;
}
export{LoginWithPhonePasswordDto}