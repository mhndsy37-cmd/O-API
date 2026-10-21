import { IsNotEmpty, IsString, Matches } from "class-validator";

class ChangePhonenumberDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^(\+98|0098|98|0)?9[0-9]{9}$/, {
        message: "phoneNumber should have 11 digits and start with 09",
    })
    newPhonenumber!: string
    @IsString()
    @IsNotEmpty()
    password!: string
}
export { ChangePhonenumberDto }