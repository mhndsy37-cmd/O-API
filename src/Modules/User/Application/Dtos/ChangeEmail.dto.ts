import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class ChangeEmailDto {
    @IsEmail()
    @IsNotEmpty()
    newEmail!: string
    @IsString()
    @IsNotEmpty()
    password!: string
}
export { ChangeEmailDto }