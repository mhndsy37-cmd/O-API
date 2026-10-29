import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentRepository } from '../../Domain/Repositories/Payment.repository.interface.js';
import { IPaymentGateway } from './../../../../Shared/Ports/PaymentGateway.interface.js';
import { Payment } from '../../Domain/Entities/Payment.entity.js';
import { InitiatePaymentDto } from '../Dtos/InitiatePayment.dto.js';
import { PaymentStatus } from '../../Domain/Enums/PaymentStatus.enum.js';
import { Cron } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';


@Injectable()
class PaymentService {
    constructor(
        @Inject('IPaymentRepository')
        private readonly paymentRepository: IPaymentRepository,
        @Inject('IPaymentGateway')
        private readonly paymentGateway: IPaymentGateway,
        @InjectPinoLogger(PaymentService.name)
        private readonly logger: PinoLogger,
    ) { }
    async initiatePayment(dto: InitiatePaymentDto): Promise<{ redirectUrl: string,authority: string }> {
        this.logger.info(`srart init pay, amount:${dto.amount}, gateway: ${dto.gateway}`);
        const payment = Payment.create(
            dto.orderId,
            dto.amount,
            dto.gateway,
        );
        try {
            const callbackUrl = 'http://localhost:3000/payments/verify';
            const gatewayResponse = await this.paymentGateway.requestPayment(
                dto.amount,
                'Store Order Payment',
                callbackUrl,
            );
            payment.setAuthority(gatewayResponse.authority);
            await this.paymentRepository.save(payment);
            this.logger.info(`payment successfully, code:${payment.getRefId()}`);
            
            return { redirectUrl: gatewayResponse.redirectUrl,  authority: gatewayResponse.authority,};

        } catch (ex:unknown) {
            payment.markAsFailed();
            await this.paymentRepository.save(payment);
            this.logger.error(`error on payment`);
            throw new BadRequestException('Error connecting to the payment gateway.');
        }
    }

    async verifyPayment(authority: string, status?: string): Promise<{ message: string; refId?: string }> {
        const payment = await this.paymentRepository.findByAuthority(authority);
        if (!payment) {
            throw new NotFoundException('Payment transaction not found.');
        }
        if (payment.getStatus() === PaymentStatus.SUCCESS) {
            return {
                message: 'This payment has already been successfully confirmed.',
                refId: payment.getRefId()!,
            };
        }
        if (payment.getStatus() !== PaymentStatus.PENDING) {
            throw new BadRequestException('The status of this transaction does not allow for re-confirmation.');
        }
        if (status !== 'OK') {
            payment.markAsCanceled();
            await this.paymentRepository.save(payment);
            return { message: 'Payment was cancelled by the user.' };
        }
        const verifyResponse = await this.paymentGateway.verifyPayment(
            authority,
            payment.getAmount(),
        );

        if (verifyResponse.isSuccess && verifyResponse.refId) {
            payment.markAsSuccess(verifyResponse.refId!);
            await this.paymentRepository.save(payment);
            return {
                message: 'Payment was successful.',
                refId: verifyResponse.refId
            };
        } else {
            payment.markAsFailed();
            await this.paymentRepository.save(payment);

            return { message: verifyResponse.message || 'The payment failed or was cancelled by the user.' };
        }
    }
    @Cron('*/5 * * * *')
    async expireStalePayments(): Promise<void> {
        const cutoff = new Date(Date.now() - 15 * 60 * 1000);
        const stalePayments = await this.paymentRepository.findPendingOlderThan(cutoff);

        for (const payment of stalePayments) {
            payment.markAsFailed();
            await this.paymentRepository.save(payment);
        }
    }
    async cancelPayment(authority: string, _userId?: string): Promise<{ message: string }> {
        const payment = await this.paymentRepository.findByAuthority(authority);
        if (!payment) throw new NotFoundException('Transaction not found.');

        if (payment.getStatus() !== PaymentStatus.PENDING) {
            throw new BadRequestException('Only pending transactions can be cancelled.');
        }

        payment.markAsCanceled();
        await this.paymentRepository.save(payment);
        return { message: 'Payment cancelled.' };
    }
}
export { PaymentService }