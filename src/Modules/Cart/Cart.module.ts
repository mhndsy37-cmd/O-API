import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartController } from './Application/Controllers/Cart.controller.js';
import { CartService } from './Application/Services/Cart.service.js';
import { CartSchema, CartSchemaFactory } from './Infrastructure/Schemas/Cart.schema.js';
import { CartRepositoryImpl } from './Infrastructure/Repositories/Cart.repository.impl.js';
import { ProductModule } from '../Product/Product.module.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';
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
            useClass: CartRepositoryImpl,
        },
    ],
    exports: ['ICartRepository'],
})
export class CartModule { }