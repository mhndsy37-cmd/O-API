import { PaymentDocument } from '../Schemas/Payment.schema.js';
import { Payment } from '../../Domain/Entities/Payment.entity.js';
import { PaymentStatus } from '../../Domain/Enums/PaymentStatus.enum.js';
import { PaymentGateway } from '../../Domain/Enums/PaymentGateway.enum.js';

class PaymentInfrastructureMapper {
    static toDomain(doc: PaymentDocument): Payment {
        return Payment.restore({
            id: doc._id.toString(),
            orderId: doc.orderId,
            amount: doc.amount,
            gateway: doc.gateway as PaymentGateway,
            authority: doc.authority,
            refId: doc.refId,
            status: doc.status as PaymentStatus,
            createdAt: doc.createdAt || new Date(),
            updatedAt: doc.updatedAt || new Date(),
        });
    }

    static toPersistence(payment: Payment): any {
        return {
            orderId: payment.getOrderId(),
            amount: payment.getAmount(),
            gateway: payment.getGateway(),
            authority: payment.getAuthority(),
            refId: payment.getRefId(),
            status: payment.getStatus(),
        };
    }
}
export{PaymentInfrastructureMapper}