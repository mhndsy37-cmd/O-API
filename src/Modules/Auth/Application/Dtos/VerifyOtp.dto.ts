import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
    // prop
    @ApiProperty({ description: 'Phone or Email', example: '09123456789' })
    @IsString()
    @IsNotEmpty()
    identifier!: string;

    // prop
    @ApiProperty({ description: 'OTP Code', example: '123456' })
    @IsString()
    @IsNotEmpty()
    code!: string;
}