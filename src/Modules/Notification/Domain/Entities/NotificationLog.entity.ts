import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { NotificationChannel } from '../Enums/NotificationChannel.enum.js';
import { NotificationStatus } from '../Enums/NotificationStatus.enum.js';

class NotificationLog extends AggregateRoot {
    private constructor(
        private readonly id: string,
        private readonly recipient: string,
        private readonly channel: NotificationChannel,
        private readonly subject: string,
        private readonly body: string,
        private status: NotificationStatus,
        private errorMessage?: string,
        private readonly createdAt: Date = new Date(),
    ) {
        super();
    }

    static create(recipient: string, channel: NotificationChannel, subject: string, body: string): NotificationLog {
        return new NotificationLog(
            new Date().getTime().toString(),
            recipient,
            channel,
            subject,
            body,
            NotificationStatus.SENT
        );
    }

    markAsFailed(error: string): void {
        this.status = NotificationStatus.FAILED;
        this.errorMessage = error;
    }

    // Getter
    getId(): string { return this.id; }
    getRecipient(): string { return this.recipient; }
    getChannel(): NotificationChannel { return this.channel; }
    getSubject(): string { return this.subject; }
    getBody(): string { return this.body; }
    getStatus(): NotificationStatus { return this.status; }
    getErrorMessage(): string | undefined { return this.errorMessage; }
    getCreatedAt(): Date { return this.createdAt; }
}
export{NotificationLog}