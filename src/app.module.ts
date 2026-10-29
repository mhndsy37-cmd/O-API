import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './Modules/User/User.module.js';
import { validateEnv } from './Shared/Configs/env.validation.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './Modules/Product/Product.module.js';
import { CategoryModule } from './Modules/Product/Category.module.js';
import { CartModule } from './Modules/Cart/Cart.module.js';
import { PaymentModule } from './Modules/Payment/Payment.module.js';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
import { OrderModule } from './Modules/Order/Order.module.js';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: validateEnv,
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.getOrThrow<string>('MONGO_URI'),
            }),
        }),
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
        EventEmitterModule.forRoot(),
        ScheduleModule.forRoot(),

        UserModule,
        ProductModule,
        CategoryModule,
        CartModule,
        PaymentModule,
        OrderModule
       //...
    ],
    controllers: [],
    providers: [{
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
    }, {
        provide: APP_FILTER,
        useClass: SentryGlobalFilter,
    },
    ],
})
export class AppModule { }