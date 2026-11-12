import { Otp } from '../Entities/Otp.entity.js';

export interface IOtpRepository {
    save(otp: Otp): Promise<void>;
    findByTarget(target: string): Promise<Otp | null>;
    deleteByTarget(target: string): Promise<void>;
}