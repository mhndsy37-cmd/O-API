import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class RegisterCustomerDto {
    @IsString()
    @IsNotEmpty()
    fullName!: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(\+98|0098|98|0)?9[0-9]{9}$/, { message: 'فرمت شماره تلفن نامعتبر است' })
    phoneNumber!: string;

    @IsEmail()
    @IsOptional()
    email!: string|null;
}