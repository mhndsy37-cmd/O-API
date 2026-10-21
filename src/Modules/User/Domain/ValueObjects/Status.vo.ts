import { UserStatus } from "../Enums/Status.enum.js";
import { InvalidStatusException, StatusErrorReason } from "../Exceptions/Status.exception.js";
import { InvalidStatusTransitionException } from "../Exceptions/StatusTrans.exception.js";

class StatusVO {
    private static readonly TRANSITIONS: Record<UserStatus, UserStatus[]> = {
        [UserStatus.PENDING]: [
            UserStatus.ACTIVE,
            UserStatus.DELETED,
        ],
        [UserStatus.ACTIVE]: [
            UserStatus.BLOCKED,
            UserStatus.SUSPENDED,
            UserStatus.DELETED,
        ],
        [UserStatus.BLOCKED]: [
            UserStatus.ACTIVE,
            UserStatus.DELETED,
        ],
        [UserStatus.SUSPENDED]: [
            UserStatus.ACTIVE,
            UserStatus.DELETED,
        ],
        [UserStatus.DELETED]: [
            //never trans
        ],
        [UserStatus.INACTIVE]: [
            UserStatus.ACTIVE
        ]
    };
    private constructor(private readonly value: UserStatus) { }
    static create(value: string): StatusVO {
        if (!value) {
            throw InvalidStatusException.ex(StatusErrorReason.REQUIRED);
        }

        if (!Object.values(UserStatus).includes(value as UserStatus)) {
            throw InvalidStatusException.ex(StatusErrorReason.INVALID_STATUS);
        }

        return new StatusVO(value as UserStatus);
    }
    static fromEnum(value: UserStatus): StatusVO {
        return new StatusVO(value);
    }
    //logic status
    isPending(): boolean {
        return this.value === UserStatus.PENDING;
    }
    isActive(): boolean {
        return this.value === UserStatus.ACTIVE;
    }
    isBlocked(): boolean {
        return this.value === UserStatus.BLOCKED;
    }
    isSuspended(): boolean {
        return this.value === UserStatus.SUSPENDED;
    }
    isDeleted(): boolean {
        return this.value === UserStatus.DELETED;
    }
    //
    canLogin(): boolean {
        return this.value === UserStatus.ACTIVE;
    }

    canPlaceOrder(): boolean {
        return this.value === UserStatus.ACTIVE;
    }

    canChangePassword(): boolean {
        return this.value === UserStatus.ACTIVE
            || this.value === UserStatus.PENDING;
    }

    canBeModified(): boolean {
        return this.value !== UserStatus.DELETED;
    }
    //trans
    canTransitionTo(next: UserStatus): boolean {
        return StatusVO.TRANSITIONS[this.value].includes(next);
    }
    transitionTo(next: UserStatus): StatusVO {
        if (!this.canTransitionTo(next)) {
            throw new InvalidStatusTransitionException(this.value, next);
        }
        return new StatusVO(next);
    }
    getAvailableTransitions(): UserStatus[] {
        return [...StatusVO.TRANSITIONS[this.value]];
    }
    //output
    getValue(): UserStatus {
        return this.value;
    }

    equals(other: StatusVO): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}
export{StatusVO}