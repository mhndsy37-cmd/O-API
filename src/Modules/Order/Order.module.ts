import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';
import { ProductModule } from '../Product/Product.module.js';
import { CartModule } from '../Cart/Cart.module.js';

import { OrderController } from './Application/Controllers/Order.controller.js';
import { OrderService } from './Application/Services/Order.service.js';
import { OrderSchema, OrderSchemaFactory } from './Infrastructure/Schemas/Order.schema.js';
import { OrderRepositoryImpl } from './Infrastructure/Repositories/Order.repository.impl.js';
import { PaymentModule } from '../Payment/Payment.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: OrderSchema.name, schema: OrderSchemaFactory }]),
        AuthSharedModule,
        ProductModule,
        CartModule, 
        PaymentModule
    ],
    controllers: [OrderController],
    providers: [
        OrderService,
        { provide: 'IOrderRepository', useClass: OrderRepositoryImpl },
    ],
    exports: [OrderService],
})
export class OrderModule {}