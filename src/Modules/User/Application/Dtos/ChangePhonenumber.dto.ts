import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

class ChangePhonenumberDto {
    // prop
    @ApiProperty({ 
        description: 'New phone number', 
        example: '09123456789' 
    }) 
    @IsNotEmpty()
    @IsString()
    @Matches(/^(\+98|0098|98|0)?9[0-9]{9}$/, {
        message: "phoneNumber should have 11 digits and start with 09",
    })
    newPhonenumber!: string;

    // prop
    @ApiProperty({ 
        description: 'Current password for verification', 
        example: 'MyP@ssw0rd' 
    }) 
    @IsString()
    @IsNotEmpty()
    password!: string;
}
export { ChangePhonenumberDto }