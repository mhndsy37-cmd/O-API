import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICartRepository } from '../../Domain/Repositories/Cart.repository.interface.js';
import { Cart } from '../../Domain/Entities/Cart.entity.js';
import { CartSchema, CartDocument } from '../Schemas/Cart.schema.js';
import { CartInfrastructureMapper } from '../Mapper/Cart.mapper.js';

@Injectable()
class CartRepositoryImpl implements ICartRepository {
    constructor(
        @InjectModel(CartSchema.name)
        private readonly cartModel: Model<CartDocument>,
    ) {}

    async findByUserId(userId: string): Promise<Cart | null> {
        const doc = await this.cartModel.findOne({ userId });
        if (!doc) return null;

        return CartInfrastructureMapper.toDomain(doc);
    }

    async save(cart: Cart): Promise<void> {
        const data = CartInfrastructureMapper.toPersistence(cart);
        await this.cartModel.updateOne(
            { userId: cart.getUserId() },
            { $set: data },
            { upsert: true }
        );
    }

    async delete(userId: string): Promise<void> {
        await this.cartModel.deleteOne({ userId });
    }
}
export{CartRepositoryImpl}