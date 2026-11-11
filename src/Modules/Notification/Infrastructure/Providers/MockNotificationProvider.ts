import { Injectable, Logger } from '@nestjs/common';
import { INotificationProvider } from '../../Domain/Interfaces/INotificationProvider.js';

@Injectable()
class MockNotificationProvider implements INotificationProvider {
    private readonly logger = new Logger(MockNotificationProvider.name);

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        this.logger.log(`📧 [MOCK EMAIL] To: ${to} | Subject: ${subject} | Body: ${body}`);
    }

    async sendSms(to: string, message: string): Promise<void> {
        this.logger.log(`📱 [MOCK SMS] To: ${to} | Message: ${message}`);
    }
}
export{MockNotificationProvider}