import { Body, Controller, Post, Get, Query, UseGuards, Inject, Param } from '@nestjs/common';
import { PaymentService } from '../Services/Payment.service.js';
import { InitiatePaymentDto } from '../Dtos/InitiatePayment.dto.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';

@Controller('payments')
class PaymentController {
    constructor(
        @Inject(PaymentService) private readonly paymentService: PaymentService
    ) { }
    @UseGuards(JwtAuthGuard)
    @Post('initiate')
    async initiate(@Body() dto: InitiatePaymentDto) {
        return this.paymentService.initiatePayment(dto);
    }
    @UseGuards(JwtAuthGuard)
    @Post('cancel/:authority')
    async cancelPayment(@Param('authority') authority: string) {
        return this.paymentService.cancelPayment(authority);
    }
    @Get('verify')
    async verify(@Query('Authority') authority: string, @Query('Status') status: string,) {
        return this.paymentService.verifyPayment(authority, status);
    }

}
export { PaymentController }