import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IOrderRepository } from '../../Domain/Repositories/Order.repository.interface.js';
import { Order } from '../../Domain/Entities/Order.entity.js';
import { OrderSchema, OrderDocument } from '../Schemas/Order.schema.js';
import { OrderInfrastructureMapper } from '../Mappers/Order.mapper.js';
import { OrderStatus } from '../../Domain/Enums/OrderStatus.enum.js';

@Injectable()
class OrderRepositoryImpl implements IOrderRepository {
    constructor(
        @InjectModel(OrderSchema.name)
        private readonly orderModel: Model<OrderDocument>,
    ) { }

    async findById(id: string): Promise<Order | null> {
        const doc = await this.orderModel.findById(id);
        return doc ? OrderInfrastructureMapper.toDomain(doc) : null;
    }
    async findByUserId(userId:string):Promise<Order[]>{
        const docs = await this.orderModel.find({userId});
        return docs.map(doc => OrderInfrastructureMapper.toDomain(doc));
    }
    async findByPaymentAuthority(authority: string): Promise<Order | null> {
        const doc = await this.orderModel.findOne({ authority });
        return doc ? OrderInfrastructureMapper.toDomain(doc) : null;
    }
    async findPendingOlderThan(cutoffDate: Date): Promise<Order[]> {
        const docs = await this.orderModel.find({
            status: OrderStatus.PENDING,
            createdAt: { $lt: cutoffDate },
        });
        return docs.map(doc => OrderInfrastructureMapper.toDomain(doc));
    }
    
    async save(order: Order): Promise<void> {
        const data = OrderInfrastructureMapper.toPersistence(order);
        await this.orderModel.updateOne(
            { _id: order.getStringId() },
            { $set: data },
            { upsert: true }
        );
    }
}
export { OrderRepositoryImpl }