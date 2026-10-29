import { Injectable } from '@nestjs/common';
import { IPaymentGateway, PaymentRequestResult, PaymentVerifyResult } from './../../../../Shared/Ports/PaymentGateway.interface.js';

@Injectable()
class MockPaymentGateway implements IPaymentGateway {
    async requestPayment(_amount: number, _description: string, _callbackUrl: string): Promise<PaymentRequestResult> {
        const authority = `MOCK-AUTH-${Date.now()}`;
        return {
            authority,
            redirectUrl: `http://localhost:3000/mock-bank?Authority=${authority}&Status=OK`,
        };
    }

    async verifyPayment(authority: string, _amount: number): Promise<PaymentVerifyResult> {
        if (authority.startsWith('MOCK-AUTH-')) {
            return {
                isSuccess: true,
                refId: `REF-${Date.now()}`,
            };
        }

        return {
            isSuccess: false,
            message: 'The authority code is invalid.',
        };
    }
}
export { MockPaymentGateway }