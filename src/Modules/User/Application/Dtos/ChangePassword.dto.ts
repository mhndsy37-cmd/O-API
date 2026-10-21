import { IsString,IsNotEmpty, MinLength, MaxLength } from "class-validator";
class ChangePasswordDto{
    @IsString()
    @IsNotEmpty()
    currentPassword!:string
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    newPassword!:string
}
export{ChangePasswordDto}