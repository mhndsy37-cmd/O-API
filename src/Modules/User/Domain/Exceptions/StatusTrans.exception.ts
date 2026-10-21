import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';
import { UserStatus } from './../Enums/Status.enum.js';

export class InvalidStatusTransitionException extends DomainException {
    readonly code = 'USER_INVALID_STATUS_TRANSITION';

    constructor(from: UserStatus, to: UserStatus) {
        super(`Cannot-transition-user-status-from:"${from}"-to:"${to}"`);
    }
}