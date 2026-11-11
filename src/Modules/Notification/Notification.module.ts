import { Module } from '@nestjs/common';
import { UserRegisteredHandler } from './Application/Handlers/UserRegistered.handler.js';
import { MockNotificationProvider } from './Infrastructure/Providers/MockNotificationProvider.js';
import { NotificationService } from './Application/Services/Notification.service.js';
import { PaymentSucceededHandler } from './Application/Handlers/PaymentSucceeded.handler.js';

@Module({
    providers: [
        NotificationService,
        UserRegisteredHandler,
        PaymentSucceededHandler,
        {
            provide: 'INotificationProvider',
            useClass: MockNotificationProvider,
        },
    ],
    exports:[NotificationService]
})
export class NotificationModule {}