import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { UserService } from '../Services/User.service.js';
import { CreateUserDto } from '../Dtos/CreateUser.dto.js';
import { UserResponseDto } from '../Dtos/UserResponse.dto.js';
import { LoginWithEmailPassword } from '../Dtos/LoginUserWithEmailPassword.dto.js';
import { LoginWithPhonePasswordDto } from '../Dtos/LoginUserWithPhonenumberPassword.dto.js';
import { LoginWithUsernamePasswordDto } from '../Dtos/LoginUserWithUsernamePassword.dto.js';
@Controller('users')
@Injectable()
class UserController {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
    ) { }
    @Post('register')
    async register(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.register(dto);
    }
    @Post('login/email-password')
    async loginEP(@Body() dto: LoginWithEmailPassword) {
        return this.userService.loginEP(dto);
    }
    @Post('login/phone-password')
    async loginPP(@Body() dto: LoginWithPhonePasswordDto) {
        return this.userService.loginPP(dto);
    }
    @Post('login/username-password')
    async loginUP(@Body() dto: LoginWithUsernamePasswordDto) {
        return this.userService.loginUP(dto);
    }
}
export { UserController }