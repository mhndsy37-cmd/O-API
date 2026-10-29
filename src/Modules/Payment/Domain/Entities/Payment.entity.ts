import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { PaymentStatus } from '../Enums/PaymentStatus.enum.js';
import { PaymentGateway } from '../Enums/PaymentGateway.enum.js';
import { PaymentId } from '../ValueObjects/PaymentId.vo.js';
import { AlreadySuccessfullyException } from '../Exceptions/Alreadysuccessfully.exception.js';
import { OnlyTransactionsPendingException } from '../Exceptions/OnlyTransactionsPending.exception.js';
class Payment extends AggregateRoot {
    private constructor(
        private readonly id: PaymentId,
        private readonly orderId: string,
        private readonly amount: number,
        private readonly gateway: PaymentGateway,
        private authority: string | null,
        private refId: string | null,
        private status: PaymentStatus,
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) {
        super();
    }

    static create(orderId: string, amount: number, gateway: PaymentGateway): Payment {
        return new Payment(
            PaymentId.generate(),
            orderId,
            amount,
            gateway,
            null,
            null,
            PaymentStatus.PENDING,
            new Date(),
            new Date()
        );
    }

    static restore(props: any): Payment {
        return new Payment(
            props.id, props.orderId, props.amount, props.gateway,
            props.authority, props.refId, props.status, props.createdAt, props.updatedAt
        );
    }

    setAuthority(authority: string): void {
        this.authority = authority;
        this.touch();
    }

    markAsSuccess(refId: string): void {
        if (this.status === PaymentStatus.SUCCESS) {
            throw new AlreadySuccessfullyException('This transaction has already been successfully confirmed.');
        }

        if (this.status !== PaymentStatus.PENDING) {
            throw new OnlyTransactionsPendingException('Only transactions pending payment can be approved.');
        }
        this.refId = refId;
        this.status = PaymentStatus.SUCCESS;
        this.touch();
    }
    markAsFailed(): void {
        if (this.status !== PaymentStatus.PENDING) {
            throw new OnlyTransactionsPendingException('Only transactions pending payment can be approved.');
        }
        this.status = PaymentStatus.FAILED;
        this.touch();
    }
    markAsCanceled(): void {
        if (this.status !== PaymentStatus.PENDING) {
            throw new OnlyTransactionsPendingException('Only transactions pending payment can be approved.');
        }
        this.status = PaymentStatus.CANCELED;
        this.touch();
    }
    
    private touch(): void {
        this.updatedAt = new Date();
    }
    getId(): PaymentId { return this.id }
    getStringId(): string {return (this.id).toString()}
    getOrderId(): string { return this.orderId; }
    getAmount(): number { return this.amount; }
    getGateway(): PaymentGateway { return this.gateway; }
    getAuthority(): string | null { return this.authority; }
    getRefId(): string | null { return this.refId; }
    getStatus(): PaymentStatus { return this.status; }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }
}
export { Payment }