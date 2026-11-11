import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../Services/Notification.service.js';
import { PaymentSucceededEvent } from '../../../Payment/Domain/Events/PaymentSucceeded.event.js';

@Injectable()
export class PaymentSucceededHandler {
    constructor(private readonly notificationService: NotificationService) {}
    @OnEvent('OrderPaidEvent')
    async handle(event: PaymentSucceededEvent): Promise<void> {
        const message = `سفارش شما با کد پیگیری ${event.refId} به مبلغ ${event.amount} تومان با موفقیت پرداخت شد.`;
        
        // sms
        await this.notificationService.sendSms(event.userPhone, message);

        // email
        if (event.userEmail) {
            await this.notificationService.sendEmail(
                event.userEmail,
                'تایید پرداخت سفارش',
                message
            );
        }
    }
}