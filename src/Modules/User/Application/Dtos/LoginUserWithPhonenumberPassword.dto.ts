import { IsNotEmpty, IsString, Matches } from 'class-validator';

class LoginWithPhonePasswordDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\+98|0098|98|0)?9[0-9]{9}$/, { message: "Invalid Phone Number" })
    phoneNumber!: string;
    @IsString()
    @IsNotEmpty()
    password!: string;
}
export{LoginWithPhonePasswordDto}