interface PaymentRequestResult {
    authority: string;
    redirectUrl: string;
}

interface PaymentVerifyResult {
    isSuccess: boolean;
    refId?: string;
    message?: string;
}

interface IPaymentGateway {
    requestPayment(amount: number, description: string, callbackUrl: string): Promise<PaymentRequestResult>;
    
    verifyPayment(authority: string, amount: number): Promise<PaymentVerifyResult>;
}
export{IPaymentGateway,PaymentRequestResult,PaymentVerifyResult}