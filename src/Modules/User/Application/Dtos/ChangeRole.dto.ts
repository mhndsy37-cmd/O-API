import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from './../../Domain/Enums/Role.enum.js';
import { ApiProperty } from '@nestjs/swagger';

class ChangeRoleDto {
    @ApiProperty({ description: 'Change user role', example: 'SELLER',enum:UserRole }) 
    @IsNotEmpty()
    @IsEnum(UserRole)
    newRole!: UserRole;
}
export{ChangeRoleDto}