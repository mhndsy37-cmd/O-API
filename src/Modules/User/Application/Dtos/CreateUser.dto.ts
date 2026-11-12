import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsNotEmpty,
    Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

class CreateUserDto {
    @ApiProperty({ description: 'Username', example: 'ali_ahmadi', minLength: 5, maxLength: 30 ,required: false})
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    username!: string;
    @ApiProperty({ description: 'Full name', example: 'Ali Ahmadi' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    fullName!: string;
    @ApiProperty({ description: 'Password', example: 'MyP@ssw0rd',required: false })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    password!: string;
    @ApiProperty({ description: 'Email address', example: 'ali@test.com',required: false }) 
    @IsEmail()
    @IsNotEmpty()
    email!: string;
    @ApiProperty({ description: 'Phone number', example: '09123456789' }) 
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\+98|0098|98|0)?9[0-9]{9}$/, {
        message: "phoneNumber should have 11 digits and start with 09",
    })
    phoneNumber!: string;
}
export{CreateUserDto}