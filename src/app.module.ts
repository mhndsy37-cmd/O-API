import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './Modules/User/User.module.js';
import { validateEnv } from './Shared/Configs/env.validation.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './Modules/Product/Product.module.js';
import { CategoryModule } from './Modules/Product/Category.module.js';
import { CartModule } from './Modules/Cart/Cart.module.js';
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
        EventEmitterModule.forRoot(),

        UserModule,
        ProductModule,
        CategoryModule,
        CartModule
        // OrderModule,
        //...
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}