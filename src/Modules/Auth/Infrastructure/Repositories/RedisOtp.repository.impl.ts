import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IOtpRepository } from '../../Domain/Repositories/Otp.repository.interface.js';
import { Otp } from '../../Domain/Entities/Otp.entity.js';

@Injectable()
export class RedisOtpRepositoryImpl implements IOtpRepository {
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: Redis,
    ) {}

    // save
    async save(otp: Otp): Promise<void> {
        const key = `otp:${otp.getTarget()}`;
        const value = JSON.stringify({
            code: otp.getCode(),
            channel: otp.getChannel(),
        });
        // setex = set with expiry (120 seconds)
        await this.redis.setex(key, 120, value);
    }

    // find
    async findByTarget(target: string): Promise<Otp | null> {
        const key = `otp:${target}`;
        const data = await this.redis.get(key);
        if (!data) return null;
        
        const parsed = JSON.parse(data);
        return Otp.create(target, parsed.code, parsed.channel);
    }

    // delete
    async deleteByTarget(target: string): Promise<void> {
        await this.redis.del(`otp:${target}`);
    }
}