import { Inject, Injectable } from '@nestjs/common';
import {Redis} from 'ioredis';
import { ICartRepository } from '../../Domain/Repositories/Cart.repository.interface.js';
import { Cart } from '../../Domain/Entities/Cart.entity.js';
import { CartItem } from '../../Domain/ValueObjects/CartItem.vo.js';

@Injectable()
export class RedisCartRepositoryImpl implements ICartRepository {
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: Redis,
    ) {}

    async save(cart: Cart): Promise<void> {
        const key = `cart:${cart.getUserId()}`;
        const data = {
            id: cart.getId(),
            userId: cart.getUserId(),
            items: cart.getItems().map(item => ({
                productId: item.productId,
                quantity: item.getQuantity(),
            })),
        };
        
        await this.redis.setex(key, 7 * 24 * 60 * 60, JSON.stringify(data));
    }

    async findByUserId(userId: string): Promise<Cart | null> {
        const key = `cart:${userId}`;
        const data = await this.redis.get(key);
        if (!data) return null;

        const parsed = JSON.parse(data);
        const items = parsed.items.map((i: any) => CartItem.create(i.productId, i.quantity));

        return Cart.restore({
            id: parsed.id,
            userId: parsed.userId,
            items: items,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async delete(userId: string): Promise<void> {
        await this.redis.del(`cart:${userId}`);
    }
}