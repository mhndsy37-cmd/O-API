import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartController } from './Application/Controllers/Cart.controller.js';
import { CartService } from './Application/Services/Cart.service.js';
import { CartSchema, CartSchemaFactory } from './Infrastructure/Schemas/Cart.schema.js';
import { ProductModule } from '../Product/Product.module.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';
import { RedisCartRepositoryImpl } from './Infrastructure/Repositories/RedisCart.repository.impl.js';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: CartSchema.name, schema: CartSchemaFactory },
        ]),
        ProductModule,
        AuthSharedModule
    ],
    controllers: [CartController],
    providers: [
        CartService,
        {
            provide: 'ICartRepository',
            useClass: RedisCartRepositoryImpl,
        },
    ],
    exports: ['ICartRepository'],
})
export class CartModule { }