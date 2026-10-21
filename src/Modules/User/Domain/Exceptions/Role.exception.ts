//import from shared/exception
import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
enum RoleErrorReason {
    INVALID_ROLE="Invalid-role",
    REQUIRED = 'required'
}
class InvalidRoleException extends DomainException {
    readonly code = 'USER_INVALID_ROLE';
    private constructor(reason: string) {
        super(reason);
    }
    static ex(reason: string): InvalidRoleException {
        const base = 'USER_INVALID_ROLE';
        //if reason have value, massage has base:reason value else massage is base
        return new InvalidRoleException(reason ? `${base}: ${reason}` : base);
    }

}
//export for ../value-object/Role.vo.ts
export {InvalidRoleException, RoleErrorReason }