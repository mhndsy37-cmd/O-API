import { Payment } from '../Entities/Payment.entity.js';

interface IPaymentRepository {
    findById(id: string): Promise<Payment | null>;
    findByAuthority(authority: string): Promise<Payment | null>;
    findByOrderId(orderId: string): Promise<Payment[]>;
    findPendingOlderThan(cutoffDate: Date): Promise<Payment[]>;
    save(payment: Payment): Promise<void>;
}
export{IPaymentRepository}