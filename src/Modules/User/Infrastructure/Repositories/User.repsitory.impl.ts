import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserRepository } from '../../Domain/Repositories/User.repository.interface.js';
import { UserTemp } from '../../Domain/Entities/User.entity.js';
import { UserId } from '../../Domain/ValueObjects/UserId.vo.js';
import { Email } from '../../Domain/ValueObjects/Email.vo.js';
import { Username } from '../../Domain/ValueObjects/Username.vo.js';
import { Phonenumber } from '../../Domain/ValueObjects/Phonenumber.vo.js';

import { UserSchema, UserDocument } from '../Schemas/User.schema.js';
import { UserInfrastructureMapper } from '../Mappers/User.mapper.js';

@Injectable()
class UserRepositoryImpl implements IUserRepository {
    constructor(
        @InjectModel(UserSchema.name)
        private readonly userModel: Model<UserDocument>,
    ) { }
    async existsByEmail(email: Email): Promise<boolean> {
        const count = await this.userModel.countDocuments({ email: email.getValue() });
        return count > 0;
    }
    async existsByUsername(username: Username): Promise<boolean> {
        const count = await this.userModel.countDocuments({ username: username.getValue() });
        return count > 0;
    }
    async existsByPhone(phone: Phonenumber): Promise<boolean> {
        const count = await this.userModel.countDocuments({ phoneNumber: phone.getValue() });
        return count > 0;
    }
    async save(user: UserTemp): Promise<void> {
        const data = UserInfrastructureMapper.toPersistence(user);
        await this.userModel.updateOne(
            { _id: user.getId().getValue() },
            { $set: data },
            { upsert: true }
        );
    }
    async findById(id: UserId): Promise<UserTemp | null> {
        const doc = await this.userModel.findById(id.getValue());
        if (!doc) return null;
        return UserInfrastructureMapper.toDomain(doc);
    }
    async findByEmail(email: Email): Promise<UserTemp | null> {
        const doc = await this.userModel.findOne({ email: email.getValue() });
        if (!doc) return null;
        return UserInfrastructureMapper.toDomain(doc);
    }
    async findByUsername(username: Username): Promise<UserTemp | null> {
        const doc = await this.userModel.findOne({ username: username.getValue() });
        if (!doc) return null;
        return UserInfrastructureMapper.toDomain(doc);
    }
    async findByPhone(phone: Phonenumber): Promise<UserTemp | null> {
        const doc = await this.userModel.findOne({ phoneNumber: phone.getValue() });
        if (!doc) return null;
        return UserInfrastructureMapper.toDomain(doc);
    }
    async findAll(options?: { skip?: number; limit?: number; role?: string; status?: string }): Promise<UserTemp[]> {
        const query: any = {};
        if (options?.role) query.role = options.role;
        if (options?.status) query.status = options.status;

        const docs = await this.userModel
            .find(query)
            .skip(options?.skip || 0)
            .limit(options?.limit || 20)
            .exec();

        return docs.map(doc => UserInfrastructureMapper.toDomain(doc));
    }
    async softDelete(id: UserId): Promise<void> {
        await this.userModel.updateOne(
            { _id: id.getValue() },
            { $set: { status: 'DELETED', updatedAt: new Date() } }
        );
    }
    async count(options?: { role?: string; status?: string }): Promise<number> {
        const query: any = {};
        if (options?.role) query.role = options.role;
        if (options?.status) query.status = options.status;

        return await this.userModel.countDocuments(query);
    }
    async delete(id: UserId): Promise<void> {
        await this.userModel.deleteOne({ _id: id.getValue() });
    }

}
export{UserRepositoryImpl}