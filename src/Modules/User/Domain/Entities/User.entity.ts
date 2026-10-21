import { UserRole } from "../Enums/Role.enum.js";
import { UserStatus } from "../Enums/Status.enum.js";
import { UsernameChangedEvent } from "../Events/UsernameChanged.event.js";
import { UsernameSameAsOldException } from "../Exceptions/UsernameSameAsOld.exception.js";
import { Email } from "../ValueObjects/Email.vo.js";
import { Fullname } from "../ValueObjects/Fullname.vo.js";
import { Password } from "../ValueObjects/Password.vo.js";
import { Phonenumber } from "../ValueObjects/Phonenumber.vo.js";
import { RoleVO } from "../ValueObjects/Role.vo.js";
import { StatusVO } from "../ValueObjects/Status.vo.js";
import { UserId } from "../ValueObjects/UserId.vo.js";
import { Username } from "../ValueObjects/Username.vo.js";
import { CreateUserProps, RestoreUserProps } from "./User.props.js";
import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { FullnameSameAsOldException } from "../Exceptions/FullnameSameAsOld.exception.js";
import { FullNameChangedEvent } from "../Events/FullnameChange.event.js";
import { InvalidCurrentPasswordException } from "../Exceptions/InvalidCurrentPassword.exception.js";
import { PasswordSameAsOldException } from "../Exceptions/PasswordSameAsOld.exception.js";
import { PasswordChangedEvent } from "../Events/PasswordChange.event.js";
import { EmailSameAsOldException } from "../Exceptions/EmailSameAsOld.exception.js";
import { EmailChangedEvent } from "../Events/EmailChange.event.js";
import { PhoneNumberSameAsOldException } from "../Exceptions/PhoneNumberSameAsOld.exception.js";
import { PhoneNumberChangedEvent } from "../Events/PhoneNumberChange.event.js";
import { RoleSameAsOldException } from "../Exceptions/RoleSameAsOld.exception.js";
import { InsufficientPermissionsException } from "../Exceptions/InsufficientPermissions.exception.js";
import { CannotChangeOwnRoleException } from "../Exceptions/CannotChangeOwnRole.exception.js";
import { RoleChangedEvent } from "../Events/RoleChange.event.js";
import { CannotBlockYourselfException } from "../Exceptions/CannotBlockYourself.exception.js";
import { CannotDeleteYourselfException } from "../Exceptions/CannotDeleteYourself.exception.js";
import { UserActivatedEvent } from "../Events/UserActivate.event.js";
import { UserBlockedEvent } from "../Events/UserBlock.event.js";
import { UserUnblockedEvent } from "../Events/UserUnblock.event.js";
import { UserSuspendedEvent } from "../Events/UserSuspend.event.js";
import { UserSoftDeletedEvent } from "../Events/UserSoftDelete.event.js";
import { UserCannotBeModifiedException } from "../Exceptions/UserCannotBeModified.exception.js";
import { UserNotDeletedException } from "../Exceptions/UserNotDelete.exception.js";
import { UserRestoredEvent } from "../Events/UserRestore.event.js";
import { ObjectId } from "bson";


class UserTemp extends AggregateRoot {

    private constructor(
        private id: UserId,
        private username: Username,
        private fullname: Fullname,
        private email: Email,
        private password: Password,
        private phoneNumber: Phonenumber,
        private role: RoleVO,
        private status: StatusVO,
        private createdAt: Date,
        private updatedAt: Date

    ) {
        super()
    }
    static async create(props: CreateUserProps): Promise<UserTemp> {
        return new UserTemp(
            UserId.generate(),
            Username.create(props.username),
            Fullname.create(props.fullname),
            Email.create(props.email),
            await Password.create(props.password),
            Phonenumber.create(props.phonenumber),
            RoleVO.create(props.role ?? UserRole.USER),
            StatusVO.create(props.status ?? UserStatus.PENDING),
            new Date(),
            new Date()
        )
    }
    private ensureCanBeModified(): void {
        if (!this.status.canBeModified()) {
            throw new UserCannotBeModifiedException(this.status.getValue());
        }
    }
    //username
    changeUsername(newUsername: string, changedBy?: UserTemp): void {
        this.ensureCanBeModified()
        const usernameVO = Username.create(newUsername);
        if (this.username.equals(usernameVO)) {
            throw new UsernameSameAsOldException();
        }
        this.updatedAt = new Date();
        const oldUsername = this.username.getValue();
        this.username = usernameVO;
        this.addEvent(new UsernameChangedEvent(this.id.getValue(), oldUsername, newUsername));
    }
    private isSelf(other: UserTemp): boolean {
        return this.id.equals(other.id);
    }
    //fullname
    changeFullName(newFullName: string): void {
        this.ensureCanBeModified()
        const fullNameVO = Fullname.create(newFullName);

        if (this.fullname.equals(fullNameVO)) {
            throw new FullnameSameAsOldException();
        }

        const oldFullName = this.fullname.getValue();
        this.fullname = fullNameVO;
        this.updatedAt = new Date();

        this.addEvent(new FullNameChangedEvent(this.id.getValue(), oldFullName, newFullName,));
    }
    //password
    async changePassword(currentPlainPassword: string, newPlainPassword: string,): Promise<void> {
        this.ensureCanBeModified()
        const isCurrentValid = await this.password.compare(currentPlainPassword);
        if (!isCurrentValid) {
            throw new InvalidCurrentPasswordException();
        }
        const newPasswordVO = await Password.create(newPlainPassword);
        if (this.password.equals(newPasswordVO)) {
            throw new PasswordSameAsOldException();
        }
        this.password = newPasswordVO;
        this.updatedAt = new Date();
        this.addEvent(new PasswordChangedEvent(this.id.getValue()));
    }
    //email
    changeEmail(newEmail: string): void {
        this.ensureCanBeModified()
        const emailVO = Email.create(newEmail);
        if (this.email.equals(emailVO)) {
            throw new EmailSameAsOldException();
        }
        const oldEmail = this.email.getValue();
        this.email = emailVO;
        if (this.status.isActive()) {
            this.status = this.status.transitionTo(UserStatus.PENDING);
        }
        this.updatedAt = new Date();
        this.addEvent(new EmailChangedEvent(this.id.getValue(), oldEmail, newEmail,));
    }
    //Phone number
    changePhoneNumber(newPhone: string): void {
        this.ensureCanBeModified()
        const phoneVO = Phonenumber.create(newPhone);

        if (this.phoneNumber.equals(phoneVO)) {
            throw new PhoneNumberSameAsOldException();
        }

        const oldPhone = this.phoneNumber.getValue();
        this.phoneNumber = phoneVO;
        if (this.status.isActive()) {
            this.status = this.status.transitionTo(UserStatus.PENDING);
        }
        this.updatedAt = new Date();
        this.addEvent(new PhoneNumberChangedEvent(this.id.getValue(), oldPhone, newPhone,));
    }
    //status
    //active
    activate(activatedBy?: UserTemp): void {

        if (activatedBy && !activatedBy.role.canManageUsers()) {
            throw new InsufficientPermissionsException();
        }
        this.status = this.status.transitionTo(UserStatus.ACTIVE);
        this.updatedAt = new Date();

        this.addEvent(new UserActivatedEvent(this.id.getValue()));
    }
    //block
    block(reason: string, blockedBy: UserTemp): void {

        if (!blockedBy.role.canManageUsers()) {
            throw new InsufficientPermissionsException();
        }

        if (this.id.equals(blockedBy.id)) {
            throw new CannotBlockYourselfException();
        }
        this.status = this.status.transitionTo(UserStatus.BLOCKED);
        this.updatedAt = new Date();
        this.addEvent(new UserBlockedEvent(this.id.getValue(), reason));
    }
    //unblock
    unblock(unblockedBy: UserTemp): void {

        if (!unblockedBy.role.canManageUsers()) {
            throw new InsufficientPermissionsException();
        }
        this.status = this.status.transitionTo(UserStatus.ACTIVE);
        this.updatedAt = new Date();
        this.addEvent(new UserUnblockedEvent(this.id.getValue()));
    }
    //sus
    suspend(reason: string, suspendedBy: UserTemp): void {

        if (!suspendedBy.role.canManageUsers()) {
            throw new InsufficientPermissionsException();
        }

        this.status = this.status.transitionTo(UserStatus.SUSPENDED);
        this.updatedAt = new Date();

        this.addEvent(new UserSuspendedEvent(this.id.getValue(), reason));
    }
    //del
    softDelete(deletedBy?: UserTemp): void {
        // ✅ اگه ادمین داره حذف می‌کنه، چک مجوز
        if (deletedBy && !this.isSelf(deletedBy)) {
            if (!deletedBy.role.canManageUsers()) {
                throw new InsufficientPermissionsException();
            }
        }
        this.status = this.status.transitionTo(UserStatus.DELETED);
        this.updatedAt = new Date();

        this.addEvent(new UserSoftDeletedEvent(
            this.id.getValue(),
            deletedBy?.id.getValue(),
        ));
    }
    //restore
    restore(restoredBy: UserTemp) {
        if (!restoredBy.role.canManageUsers()) {
            throw new InsufficientPermissionsException();
        }

        if (!this.status.isDeleted()) {
            throw new UserNotDeletedException();
        }

        this.status = this.status.transitionTo(UserStatus.ACTIVE);
        this.updatedAt = new Date();

        this.addEvent(new UserRestoredEvent(this.id.getValue()));
    }
    static restore(props: RestoreUserProps): UserTemp {
        return new UserTemp(
            UserId.createFromPlain(props.id),
            Username.create(props.username),
            Fullname.create(props.fullname),
            Email.create(props.email),
            Password.createFromHash(props.password),
            Phonenumber.create(props.phoneNumber),
            RoleVO.create(props.role),
            StatusVO.create(props.status),
            props.createdAt,
            props.updatedAt
        );
    }
    //role
    changeRole(newRole: string, changedBy: UserTemp): void {
        this.ensureCanBeModified()
        const roleVO = RoleVO.create(newRole);
        if (this.role.equals(roleVO)) {
            throw new RoleSameAsOldException();
        }
        if (!changedBy.role.canManageUsers()) {
            throw new InsufficientPermissionsException();
        }
        if (this.id.equals(changedBy.id)) {
            throw new CannotChangeOwnRoleException();
        }

        const oldRole = this.role.getValue();
        this.role = roleVO;
        this.updatedAt = new Date();

        this.addEvent(new RoleChangedEvent(this.id.getValue(), oldRole, newRole,));
    }
    //output
    getId():UserId{
        return this.id
    }
    getUsername(): Username {
        return this.username;
    }
    getFullname(): Fullname {
        return this.fullname
    }
    getEmail(): Email {
        return this.email
    }
    getPhonenumber(): Phonenumber {
        return this.phoneNumber
    }
    getRole(): RoleVO {
        return this.role
    }
    getStatus(): StatusVO {
        return this.status
    }
    getCreatedAt():Date{
        return this.createdAt
    }
    getPassword(): Password {
        return this.password;
    }
    getUpdatedAt():Date{
        return this.updatedAt
    }
    canLogin(): boolean {
        return this.status.canLogin();
    }

}
export { UserTemp }