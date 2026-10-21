import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';

export enum StatusErrorReason {
    INVALID_STATUS = 'invalid-status',
    REQUIRED = 'required',
}

export class InvalidStatusException extends DomainException {
    readonly code = 'USER_INVALID_STATUS';

    private constructor(message: string) {
        super(message);
    }

    static ex(reason?: StatusErrorReason): InvalidStatusException {
        const base = 'USER_INVALID_STATUS';
        return new InvalidStatusException(reason ? `${base}: ${reason}` : base);
    }
}