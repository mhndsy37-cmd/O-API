import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsNotEmpty,
    Matches,
} from 'class-validator';

class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    username!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    fullName!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    password!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(\+98|0098|98|0)?9[0-9]{9}$/, {
        message: "phoneNumber should have 11 digits and start with 09",
    })
    phoneNumber!: string;
}
export{CreateUserDto}