import { UserRole } from "../../Domain/Enums/Role.enum.js";
import { UserStatus } from "../../Domain/Enums/Status.enum.js";

class UserResponseDto {
    id!: string;
    username!: string;
    fullName!: string;
    email!: string;
    phoneNumber!: string;
    role!: UserRole;
    status!: UserStatus;
    createdAt!: Date;
    updatedAt?: Date;
}
export { UserResponseDto }