import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

class ActivateUserDto {
    // prop
    @ApiProperty({ 
        description: 'User email for activation', 
        example: 'ali@test.com' 
    }) 
    @IsEmail()
    @IsNotEmpty()
    email!: string;
}
export { ActivateUserDto }