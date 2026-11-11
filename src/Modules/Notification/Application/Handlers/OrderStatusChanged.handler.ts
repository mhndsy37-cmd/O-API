import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../Services/Notification.service.js';
import { OrderStatusChangedEvent } from '../../../Order/Domain/Events/OrderStatusChanged.event.js';
import { OrderStatus } from '../../../Order/Domain/Enums/OrderStatus.enum.js';

@Injectable()
export class OrderStatusChangedHandler {
    constructor(private readonly notificationService: NotificationService) {}

    // order
    @OnEvent('OrderStatusChangedEvent')
    async handle(event: OrderStatusChangedEvent): Promise<void> {
        let statusText = '';
        switch (event.newStatus) {
            case OrderStatus.PROCESSING: statusText = 'در حال پردازش'; break;
            case OrderStatus.SHIPPED: statusText = 'ارسال شده'; break;
            case OrderStatus.DELIVERED: statusText = 'تحویل داده شده'; break;
            case OrderStatus.CANCELED: statusText = 'لغو شده'; break;
            default: return;
        }

        const message = `وضعیت سفارش شما با شناسه ${event.orderId} به "${statusText}" تغییر یافت.`;
        await this.notificationService.sendSms(event.userPhone, message);
    }
}