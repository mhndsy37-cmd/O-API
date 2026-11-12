import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../Domain/Enums/Role.enum.js';

export class PromoteUserDto {
    // prop
    @ApiProperty({ 
        description: 'New role for user', 
        enum: UserRole, 
        example: UserRole.SELLER 
    })
    @IsEnum(UserRole, { message: 'Role is incorrect' })
    newRole!: UserRole;

    // prop
    @ApiProperty({ 
        description: 'Username to assign', 
        example: 'ali_ahmadi' 
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    username!: string;

    // prop
    @ApiProperty({ 
        description: 'Password to assign', 
        example: 'MyP@ssw0rd' 
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    password!: string;

    // prop
    @ApiProperty({ 
        description: 'Email to assign (optional)', 
        example: 'ali@test.com', 
        required: false 
    })
    @IsOptional()
    @IsEmail() // 👈 تغییر از IsString به IsEmail
    email?: string;
}