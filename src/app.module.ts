import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';

// 👈 آدرس ماژول User رو دقیق چک کن (با پسوند .js چون از ESM استفاده می‌کنی)
import { UserModule } from './Modules/User/User.module.js';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/shop_db'),
        EventEmitterModule.forRoot(),

        UserModule,
        
        
        // ProductModule,
        // OrderModule,
        //...
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}