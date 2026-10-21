import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from './../../Domain/Enums/Role.enum.js';

class ChangeRoleDto {
    @IsNotEmpty()
    @IsEnum(UserRole)
    newRole!: UserRole;
}
export{ChangeRoleDto}