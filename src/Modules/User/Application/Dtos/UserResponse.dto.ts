import { UserRole } from "../../Domain/Enums/Role.enum.js";
import { UserStatus } from "../../Domain/Enums/Status.enum.js";

class UserResponseDto {
    id!: string;
    username!: string|null;
    fullName!: string;
    email!: string|null;
    phoneNumber!: string;
    role!: UserRole;
    status!: UserStatus;
    createdAt!: Date;
    updatedAt?: Date;
}
export { UserResponseDto }