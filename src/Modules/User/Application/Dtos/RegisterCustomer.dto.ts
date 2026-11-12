import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, MaxLength } from 'class-validator';

export class RegisterCustomerDto {
    // prop
    @ApiProperty({ 
        description: 'Full name', 
        example: 'Ali Ahmadi', 
        minLength: 3, 
        maxLength: 60 
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    fullName!: string;

    // prop
    @ApiProperty({ 
        description: 'Phone number', 
        example: '09123456789' 
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\+98|0098|98|0)?9[0-9]{9}$/, {
        message: 'phoneNumber should have 11 digits and start with 09',
    })
    phoneNumber!: string;

    // prop
    @ApiProperty({ 
        description: 'Email address (optional)', 
        example: 'ali@test.com', 
        required: false,
        nullable: true
    })
    @IsEmail()
    @IsOptional()
    email?: string | null;
}