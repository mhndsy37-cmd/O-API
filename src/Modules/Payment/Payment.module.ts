import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentController } from './Application/Controllers/Payment.controller.js';
import { PaymentService } from './Application/Services/Payment.service.js';
import { PaymentSchema, PaymentSchemaFactory } from './Infrastructure/Schemas/Payment.schema.js';
import { PaymentRepositoryImpl } from './Infrastructure/Repositories/Payment.repository.impl.js';
import { MockPaymentGateway } from './Infrastructure/Gateways/MockPayment.gateway.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PaymentSchema.name, schema: PaymentSchemaFactory },
        ]),
        AuthSharedModule
    ],
    controllers: [PaymentController],
    providers: [
        PaymentService,
        {
            provide: 'IPaymentRepository',
            useClass: PaymentRepositoryImpl,
        },
        {
            provide: 'IPaymentGateway',
            useClass: MockPaymentGateway,
        },
    ],
    exports: [PaymentService],
})
export class PaymentModule {}