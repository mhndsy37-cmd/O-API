import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../../Domain/Enums/Role.enum.js';

export class PromoteUserDto {
    @IsEnum(UserRole, { message: 'نقش نامعتبر است' })
    @IsNotEmpty()
    newRole!: UserRole;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    username!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string;

    @IsOptional()
    @IsString()
    email?: string;
}