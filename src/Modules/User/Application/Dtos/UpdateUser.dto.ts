import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

class UpdateUserDto{
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    username?:string
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    fullname?:string
}
export{UpdateUserDto}