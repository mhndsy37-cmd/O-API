import { UserTemp } from '../Entities/User.entity.js';
import { UserId } from '../ValueObjects/UserId.vo.js';
import { Email } from '../ValueObjects/Email.vo.js';
import { Username } from '../ValueObjects/Username.vo.js';
import { Phonenumber } from '../ValueObjects/Phonenumber.vo.js';

interface IUserRepository {
    findById(id: UserId): Promise<UserTemp | null>;

    findByEmail(email: Email): Promise<UserTemp | null>;

    findByUsername(username: Username): Promise<UserTemp | null>;

    findByPhone(phone: Phonenumber): Promise<UserTemp | null>;

    findAll(options?: {
        skip?: number;
        limit?: number;
        role?: string;
        status?: string;
    }): Promise<UserTemp[]>;

    save(user: UserTemp): Promise<void>;

    delete(id: UserId): Promise<void>;

    softDelete(id: UserId): Promise<void>;

    existsByEmail(email: Email): Promise<boolean>;

    existsByUsername(username: Username): Promise<boolean>;

    existsByPhone(phone: Phonenumber): Promise<boolean>;

    count(options?: { role?: string; status?: string }): Promise<number>;
}
export{IUserRepository}