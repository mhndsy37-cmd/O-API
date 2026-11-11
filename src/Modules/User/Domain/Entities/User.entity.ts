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
import { UserActivatedEvent } from "../Events/UserActivate.event.js";
import { UserBlockedEvent } from "../Events/UserBlock.event.js";
import { UserUnblockedEvent } from "../Events/UserUnblock.event.js";
import { UserSuspendedEvent } from "../Events/UserSuspend.event.js";
import { UserSoftDeletedEvent } from "../Events/UserSoftDelete.event.js";
import { UserCannotBeModifiedException } from "../Exceptions/UserCannotBeModified.exception.js";
import { UserNotDeletedException } from "../Exceptions/UserNotDelete.exception.js";
import { UserRestoredEvent } from "../Events/UserRestore.event.js";
import { UserRegisteredEvent } from "../Events/UserRegistered.event.js";
import { AssignCredentialsException } from "../Exceptions/AssignCredentials.exception.js";



class UserTemp extends AggregateRoot {

    private constructor(
        private id: UserId,
        private username: Username | null,
        private fullname: Fullname,
        private email: Email | null,
        private password: Password | null,
        private phoneNumber: Phonenumber,
        private role: RoleVO,
        private status: StatusVO,
        private createdAt: Date,
        private updatedAt: Date

    ) {
        super()
    }
    static async create(props: CreateUserProps): Promise<UserTemp> {
        const user = new UserTemp(
            UserId.generate(),
            props.username ? Username.create(props.username) : null,
            Fullname.create(props.fullname),
            props.email ? Email.create(props.email) : null,
            props.password ? await Password.create(props.password) : null,
            Phonenumber.create(props.phonenumber),
            RoleVO.create(props.role ?? UserRole.USER),
            StatusVO.create(props.status ?? UserStatus.PENDING),
            new Date(),
            new Date()
        );

        user.addEvent(new UserRegisteredEvent(
            user.getId().toString(),
            user.getUsername()?.getValue() ?? null,
            user.getEmail()?.getValue() ?? null,
            user.getPhonenumber().getValue()
        ));

        return user;
    }
    async assignCredentials(username: string, password: string): Promise<void> {
        if (this.username !== null || this.password !== null) {
            throw new AssignCredentialsException();
        }
        this.username = Username.create(username);
        this.password = await Password.create(password);

        this.touch();
    }
    private touch() {
        this.updatedAt = new Date()
    }
    private ensureCanBeModified(): void {
        if (!this.status.canBeModified()) {
            throw new UserCannotBeModifiedException(this.status.getValue());
        }
    }
    private ensureCanBeModifiedUPE(): void {
        if (!this.role.canBeModifiedUPE()) {
            throw new UserCannotBeModifiedException(this.role.getValue());
        }
    }
    //username
    // در User.entity.ts

    changeUsername(newUsername: string): void {
        this.ensureCanBeModified();
        this.ensureCanBeModifiedUPE();
        
        const usernameVO = Username.create(newUsername);
        const oldUsername = this.username?.getValue() ?? null;
        if (this.username && this.username.equals(usernameVO)) {
            throw new UsernameSameAsOldException();
        }
        this.username = usernameVO;
        this.touch();
        
        this.addEvent(new UsernameChangedEvent(this.id.toString(), oldUsername, newUsername));
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
        this.ensureCanBeModifiedUPE()
        const newPasswordVO = await Password.create(newPlainPassword);
        if (this.password) {
            const isCurrentValid = await this.password.compare(currentPlainPassword);
            if (!isCurrentValid) {
                throw new InvalidCurrentPasswordException();
            }
            if (this.password.equals(newPasswordVO)) {
                throw new PasswordSameAsOldException();
            }
            this.password = newPasswordVO;
            this.updatedAt = new Date();
            this.addEvent(new PasswordChangedEvent(this.id.getValue()));
        }
        else {
            this.password = newPasswordVO;
            this.updatedAt = new Date();
            this.addEvent(new PasswordChangedEvent(this.id.getValue()));
        }
    }
    //email
    changeEmail(newEmail: string): void {
        this.ensureCanBeModified()
        this.ensureCanBeModifiedUPE()
        const emailVO = Email.create(newEmail);
        if (this.email) {
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
        } else {
            this.email = emailVO;
            this.updatedAt = new Date();
            this.addEvent(new EmailChangedEvent(this.id.getValue(), null, newEmail,));
        }
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
        this.updatedAt = new Date();
        this.addEvent(new PhoneNumberChangedEvent(this.id.getValue(), oldPhone, newPhone));
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
            props.username ? Username.create(props.username) : null, 
            Fullname.create(props.fullname),
            props.email ? Email.create(props.email) : null,
            props.password ? Password.createFromHash(props.password) : null,
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
    getId(): UserId {
        return this.id
    }
    getUsername(): Username | null {
        return this.username;
    }
    getFullname(): Fullname {
        return this.fullname
    }
    getEmail(): Email | null {
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
    getCreatedAt(): Date {
        return this.createdAt
    }
    getPassword(): Password | null {
        return this.password;
    }
    getUpdatedAt(): Date {
        return this.updatedAt
    }
    canLogin(): boolean {
        return this.status.canLogin();
    }

}
export { UserTemp }