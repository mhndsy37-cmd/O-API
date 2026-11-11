import { IsNotEmpty, IsString } from 'class-validator';

export class CheckLoginIdentifierDto {
    @IsString()
    @IsNotEmpty()
    identifier!: string;
}