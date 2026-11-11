import { Inject, Injectable, Logger } from '@nestjs/common';
import { INotificationProvider } from '../../Domain/Interfaces/INotificationProvider.js';
import { NotificationChannel } from '../../Domain/Enums/NotificationChannel.enum.js';

@Injectable()
class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(
        @Inject('INotificationProvider')
        private readonly provider: INotificationProvider,
    ) {}

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        try {
            await this.provider.sendEmail(to, subject, body);
            this.logger.log(`[${NotificationChannel.EMAIL}] Sent to ${to}`);
        } catch (error:any) {
            this.logger.error(`[${NotificationChannel.EMAIL}] Failed to send to ${to}`, error.stack);
        }
    }

    async sendSms(to: string, message: string): Promise<void> {
        try {
            await this.provider.sendSms(to, message);
            this.logger.log(`[${NotificationChannel.SMS}] Sent to ${to}`);
        } catch (error:any) {
            this.logger.error(`[${NotificationChannel.SMS}] Failed to send to ${to}`, error.stack);
        }
    }
}
export{NotificationService}