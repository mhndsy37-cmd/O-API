import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckLoginIdentifierDto {
    // prop
    @ApiProperty({ 
        description: 'Identifier for login (email, phone, or username)', 
        example: 'ali@test.com' 
    }) 
    @IsString()
    @IsNotEmpty()
    identifier!: string;
}