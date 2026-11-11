import { UserRole } from "./../Enums/Role.enum.js";
import { UserStatus } from "./../Enums/Status.enum.js";

interface CreateUserProps{
    
    fullname:string;
    email?: string | null;
    username?: string | null;
    password?: string | null;
    phonenumber:string;
    role?:UserRole;
    status?:UserStatus
}
interface RestoreUserProps {
    id: string;
    username: string|null;
    fullname: string;
    email: string|null;
    password: string|null;
    phoneNumber: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
export {CreateUserProps,RestoreUserProps}