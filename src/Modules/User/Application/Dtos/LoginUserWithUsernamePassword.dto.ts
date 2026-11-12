import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginWithUsernamePasswordDto {
    @ApiProperty({ description: 'Login with Username', example: 'ali_ahmadi' })
    @IsString()
    @IsNotEmpty()
    username!: string;
    @ApiProperty({ description: 'Password', example: 'MyP@ssw0rd' })
    @IsString()
    @IsNotEmpty()
    password!: string;
}