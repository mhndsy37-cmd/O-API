import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
class LoginWithEmailPassword {
    @IsEmail()
    @IsNotEmpty()
    email!: string;
    @IsString()
    @IsNotEmpty()
    password!: string;
}
export{LoginWithEmailPassword}