import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPaymentRepository } from '../../Domain/Repositories/Payment.repository.interface.js';
import { Payment } from '../../Domain/Entities/Payment.entity.js';
import { PaymentSchema, PaymentDocument } from '../Schemas/Payment.schema.js';
import { PaymentInfrastructureMapper } from '../Mappers/Payment.mapper.js';
import { PaymentStatus } from '../../Domain/Enums/PaymentStatus.enum.js';

@Injectable()
class PaymentRepositoryImpl implements IPaymentRepository {
    constructor(
        @InjectModel(PaymentSchema.name)
        private readonly paymentModel: Model<PaymentDocument>,
    ) { }

    async findById(id: string): Promise<Payment | null> {
        const doc = await this.paymentModel.findById(id);
        return doc ? PaymentInfrastructureMapper.toDomain(doc) : null;
    }

    async findByAuthority(authority: string): Promise<Payment | null> {
        const doc = await this.paymentModel.findOne({ authority });
        return doc ? PaymentInfrastructureMapper.toDomain(doc) : null;
    }
    async findPendingOlderThan(cutoffDate: Date): Promise<Payment[]> {
        const docs = await this.paymentModel.find({
            status: PaymentStatus.PENDING,
            createdAt: { $lt: cutoffDate },
        });
        return docs.map(doc => PaymentInfrastructureMapper.toDomain(doc));
    }
    async findByOrderId(orderId: string): Promise<Payment[]> {
        const docs = await this.paymentModel.find({ orderId });
        return docs.map(doc => PaymentInfrastructureMapper.toDomain(doc));
    }

    async save(payment: Payment): Promise<void> {
        const data = PaymentInfrastructureMapper.toPersistence(payment);
        await this.paymentModel.updateOne(
            { _id: payment.getStringId() },
            { $set: data },
            { upsert: true }
        );
    }
}
export { PaymentRepositoryImpl }