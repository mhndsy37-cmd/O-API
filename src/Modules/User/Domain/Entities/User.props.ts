import { UserRole } from "./../Enums/Role.enum.js";
import { UserStatus } from "./../Enums/Status.enum.js";

interface CreateUserProps {
    fullname: string;
    phonenumber: string;

    email?: string | null | undefined;
    username?: string | null | undefined;
    password?: string | null | undefined;

    role?: UserRole;
    status?: UserStatus;
}
interface RestoreUserProps {
    id: string;
    username: string | null;
    fullname: string;
    email: string | null;
    password: string | null;
    phoneNumber: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
export { CreateUserProps, RestoreUserProps }