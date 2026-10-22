import { Body, Controller, Get, Inject, Injectable, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../Services/User.service.js';
import { CreateUserDto } from '../Dtos/CreateUser.dto.js';
import { UserResponseDto } from '../Dtos/UserResponse.dto.js';
import { LoginWithEmailPassword } from '../Dtos/LoginUserWithEmailPassword.dto.js';
import { LoginWithPhonePasswordDto } from '../Dtos/LoginUserWithPhonenumberPassword.dto.js';
import { LoginWithUsernamePasswordDto } from '../Dtos/LoginUserWithUsernamePassword.dto.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';
import { GetUser } from '../../../../Shared/Decorators/GetUser.decorator.js';
import { UpdateUserDto } from '../Dtos/UpdateUser.dto.js';
import { ChangePasswordDto } from '../Dtos/ChangePassword.dto.js';
import { RolesGuard } from '../../../../Shared/Guards/Roles.guard.js';
import { Roles } from '../../../../Shared/Decorators/Roles.decorator.js';
import { UserRole } from '../../Domain/Enums/Role.enum.js';
import { ChangeRoleDto } from '../Dtos/ChangeRole.dto.js';
@Controller('users')
@Injectable()
class UserController {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
    ) { }
    //jwt G
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@GetUser('sub') userId: string) {
        return this.userService.getProfile(userId);
    }
    //posts
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
    //patchs
    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateProfile(
        @GetUser('sub') userId: string,
        @Body() dto: UpdateUserDto
    ) {
        return this.userService.updateProfile(userId, dto);
    }
    @UseGuards(JwtAuthGuard)
    @Patch('me/password')
    async changePassword(
        @GetUser('sub') userId: string,
        @Body() dto: ChangePasswordDto
    ) {
        return this.userService.changePassword(userId, dto);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)              
    @Patch('admin/:id/block')
    async blockUser(
        @GetUser('sub') adminId: string,
        @Param('id') targetUserId: string,
        @Body('reason') reason: string,
    ) {
        return this.userService.blockUser(adminId, targetUserId, reason);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Patch('admin/:id/unblock')
    async unblockUser(
        @GetUser('sub') adminId: string,
        @Param('id') targetUserId: string,
    ) {
        return this.userService.unblockUser(adminId, targetUserId);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Patch('admin/:id/role')
    async changeRole(
        @GetUser('sub') adminId: string,
        @Param('id') targetUserId: string,
        @Body() dto: ChangeRoleDto,
    ) {
        return this.userService.changeUserRole(adminId, targetUserId, dto);
    }

}
export { UserController }