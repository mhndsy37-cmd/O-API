import { IsEmail, IsNotEmpty } from 'class-validator';
class ActivateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;
}
export{ActivateUserDto}