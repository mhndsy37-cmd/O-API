import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../Services/Notification.service.js';
import { UserRegisteredEvent } from '../../../User/Domain/Events/UserRegistered.event.js';

@Injectable()
class UserRegisteredHandler {
    constructor(private readonly notificationService: NotificationService) {}

    @OnEvent('UserRegisteredEvent')
    async handle(event: UserRegisteredEvent): Promise<void> {
        await this.notificationService.sendSms(
            event.phonenumber,
            `سلام، ثبت‌نام شما با موفقیت انجام شد.`
        );
         if (event.email) {
            await this.notificationService.sendEmail(
                event.email,
                'به فروشگاه ما خوش آمدید!',
                `سلام ${event.username || 'کاربر'}، ثبت‌نام شما با موفقیت انجام شد.`
            );
        }
    }
}
export{UserRegisteredHandler}