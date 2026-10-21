import { UserRole } from "../Enums/Role.enum.js";
import { InvalidRoleException, RoleErrorReason } from "../Exceptions/Role.exception.js";

class RoleVO {
    private constructor(private readonly value: UserRole) { }
    static create(value: string): RoleVO {
        if (!value) {
            throw InvalidRoleException.ex(RoleErrorReason.REQUIRED);
        }
        if (!Object.values(UserRole).includes(value as UserRole)) {
            throw InvalidRoleException.ex(RoleErrorReason.INVALID_ROLE);
        }

        return new RoleVO(value as UserRole);
    }
    static fromEnum(value: UserRole): RoleVO {
        return new RoleVO(value);
    }
    isAdmin(): boolean {
        return this.value === UserRole.ADMIN;
    }
    isSeller(): boolean {
        return this.value === UserRole.SELLER;
    }
    isUser(): boolean {
        return this.value === UserRole.USER;
    }
    canManageUsers(): boolean {
        return this.value === UserRole.ADMIN;
    }
    canCreateProduct(): boolean {
        return this.value === UserRole.ADMIN || this.value === UserRole.SELLER;
    }
    canEditProduct(): boolean {
        return this.value === UserRole.ADMIN || this.value === UserRole.SELLER;
    }
    canDeleteProduct(): boolean {
        return this.value === UserRole.ADMIN;
    }
    canPurchase(): boolean {return true}
    canManageOrders(): boolean {
        return this.value === UserRole.ADMIN 
    }
    canAccessPanel(): boolean {
        return this.value !== UserRole.USER;
    }
    getValue(): UserRole {
        return this.value;
    }

    equals(other: RoleVO): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}
export{RoleVO}