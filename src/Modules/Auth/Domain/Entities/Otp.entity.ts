import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { OtpChannel } from '../Enums/OtpChannel.enum.js';

export class Otp extends AggregateRoot {
    private constructor(
        private readonly target: string,
        private readonly code: string,
        private readonly channel: OtpChannel,
    ) { super(); }

    // factory
    static create(target: string, code: string, channel: OtpChannel): Otp {
        return new Otp(target, code, channel);
    }

    // getters
    getTarget(): string { return this.target; }
    getCode(): string { return this.code; }
    getChannel(): OtpChannel { return this.channel; }
}