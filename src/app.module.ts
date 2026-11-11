import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {  APP_GUARD } from '@nestjs/core';

// config
import { validateEnv } from './Shared/Configs/env.validation.js';

// modules
import { UserModule } from './Modules/User/User.module.js';
import { ProductModule } from './Modules/Product/Product.module.js';
import { CategoryModule } from './Modules/Product/Category.module.js';
import { CartModule } from './Modules/Cart/Cart.module.js';
import { PaymentModule } from './Modules/Payment/Payment.module.js';
import { OrderModule } from './Modules/Order/Order.module.js';
import { NotificationModule } from './Modules/Notification/Notification.module.js';

@Module({
    imports: [
        // config
        ConfigModule.forRoot({
            isGlobal: true,
            validate: validateEnv,
        }),

        // database
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.getOrThrow<string>('MONGO_URI'),
            }),
        }),

        // logger
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        translateTime: 'SYS:standard',
                    },
                },
                level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
                redact: {
                    paths: ['req.headers.authorization', 'req.body.password', 'req.body.currentPassword'],
                    censor: '***HIDDEN***',
                },
                customProps: (_req, _res) => ({
                    context: 'HTTP',
                }),
                customLogLevel: (_req, res, err) => {
                    if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
                    if (res.statusCode >= 500 || err) return 'error';
                    return 'info';
                },
            },
        }),

        // throttle
        ThrottlerModule.forRoot([
            {
                name: 'short',
                ttl: 1000,
                limit: 10,
            },
            {
                name: 'medium',
                ttl: 60000,
                limit: 100,
            },
            {
                name: 'long',
                ttl: 3600000,
                limit: 1000,
            },
        ]),

        // events
        EventEmitterModule.forRoot(),
        
        // schedule
        ScheduleModule.forRoot(),

        // modules
        UserModule,
        ProductModule,
        CategoryModule,
        CartModule,
        PaymentModule,
        OrderModule,
        NotificationModule,
    ],
    controllers: [],
    providers: [
        // global
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
       
        
    ],
})
export class AppModule {}