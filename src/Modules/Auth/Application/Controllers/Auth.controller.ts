import { Body, Controller, Post, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from '../Services/Auth.service.js';
import { RequestOtpDto } from '../Dtos/RequestOtp.dto.js';
import { VerifyOtpDto } from '../Dtos/VerifyOtp.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private readonly authService: AuthService) {}

    // otp
    @ApiOperation({ summary: 'Request OTP for login/register' })
    @Throttle({ short: { limit: 3, ttl: 60000 } })
    @Post('otp/request')
    async requestOtp(@Body() dto: RequestOtpDto) {
        return this.authService.requestOtp(dto.identifier);
    }

    // verify
    @ApiOperation({ summary: 'Verify OTP and login/register' })
    @Throttle({ short: { limit: 5, ttl: 60000 } })
    @Post('otp/verify')
    async verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.authService.verifyOtp(dto.identifier, dto.code);
    }
}