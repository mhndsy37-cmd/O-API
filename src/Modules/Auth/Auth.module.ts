import { Module } from '@nestjs/common';
import { AuthController } from './Application/Controllers/Auth.controller.js';
import { AuthService } from './Application/Services/Auth.service.js';
import { RedisOtpRepositoryImpl } from './Infrastructure/Repositories/RedisOtp.repository.impl.js';
import { NotificationModule } from '../Notification/Notification.module.js';
import { UserModule } from '../User/User.module.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';

@Module({
    imports: [
        NotificationModule,
        UserModule,
        AuthSharedModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        { provide: 'IOtpRepository', useClass: RedisOtpRepositoryImpl },
    ],
})
export class AuthModule {}