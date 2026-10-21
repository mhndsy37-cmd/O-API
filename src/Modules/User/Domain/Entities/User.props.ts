import { UserRole } from "./../Enums/Role.enum.js";
import { UserStatus } from "./../Enums/Status.enum.js";

interface CreateUserProps{
    username:string;
    fullname:string;
    password:string;
    phonenumber:string;
    email:string;
    role?:UserRole;
    status?:UserStatus
}
interface RestoreUserProps {
    id: string;
    username: string;
    fullname: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
export {CreateUserProps,RestoreUserProps}