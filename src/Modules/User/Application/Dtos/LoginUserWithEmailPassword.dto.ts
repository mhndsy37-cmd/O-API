import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
class LoginWithEmailPassword {
    @ApiProperty({ description: 'Login with email', example: 'ali@test.com' }) 
    @IsEmail()
    @IsNotEmpty()
    email!: string;
    @ApiProperty({ description: 'Password', example: 'MyP@ssw0rd' }) 
    @IsString()
    @IsNotEmpty()
    password!: string;
}
export{LoginWithEmailPassword}