import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestOtpDto {
    // prop
    @ApiProperty({ description: 'Phone or Email', example: '09123456789' })
    @IsString()
    @IsNotEmpty()
    identifier!: string;
}