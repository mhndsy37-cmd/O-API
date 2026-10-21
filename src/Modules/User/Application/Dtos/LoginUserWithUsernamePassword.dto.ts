import { IsNotEmpty, IsString } from 'class-validator';

export class LoginWithUsernamePasswordDto {
    @IsString()
    @IsNotEmpty()
    username!: string;
    @IsString()
    @IsNotEmpty()
    password!: string;
}