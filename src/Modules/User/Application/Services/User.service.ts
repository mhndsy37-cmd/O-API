import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../Domain/Repositories/User.repository.interface.js';
import { UserTemp } from '../../Domain/Entities/User.entity.js';
import { UserResponseMapper } from '../../Infrastructure/Mappers/User.mapper.js';

// DTOs
import { CreateUserDto } from '../Dtos/CreateUser.dto.js';
import { RegisterCustomerDto } from '../Dtos/RegisterCustomer.dto.js';
import { CheckLoginIdentifierDto } from '../Dtos/CheckLoginIdentifier.dto.js';
import { PromoteUserDto } from '../Dtos/PromoteUser.dto.js';
import { LoginWithEmailPassword } from '../Dtos/LoginUserWithEmailPassword.dto.js';
import { LoginWithPhonePasswordDto } from '../Dtos/LoginUserWithPhonenumberPassword.dto.js';
import { LoginWithUsernamePasswordDto } from '../Dtos/LoginUserWithUsernamePassword.dto.js';
import { ActivateUserDto } from '../Dtos/ActivateUser.dto.js';
import { UpdateUserDto } from '../Dtos/UpdateUser.dto.js';
import { ChangePasswordDto } from '../Dtos/ChangePassword.dto.js';
import { ChangeRoleDto } from '../Dtos/ChangeRole.dto.js';
import { UserResponseDto } from '../Dtos/UserResponse.dto.js';

// Enums & VOs
import { UserRole } from '../../Domain/Enums/Role.enum.js';
import { UserStatus } from '../../Domain/Enums/Status.enum.js';
import { Email } from '../../Domain/ValueObjects/Email.vo.js';
import { Username } from '../../Domain/ValueObjects/Username.vo.js';
import { Phonenumber } from '../../Domain/ValueObjects/Phonenumber.vo.js';
import { UserId } from '../../Domain/ValueObjects/UserId.vo.js';

// Exceptions
import { EmailErrorReason, InvalidEmailException } from '../../Domain/Exceptions/Email.exception.js';
import { InvalidUsernameException, UsernameErrorReason } from '../../Domain/Exceptions/Username.exception.js';
import { InvalidPhonenumberException, PhonenumberErrorReason } from '../../Domain/Exceptions/Phonenumber.exception.js';
import { UserNotFoundExceptionEP } from '../../Domain/Exceptions/UserNotFoundExceptionEP.exception.js';
import { UserNotFoundException } from '../../Domain/Exceptions/UserNotFound.exception.js';
import { ForbiddenException } from '../../../Product/Domain/Exceptions/Forbidden.exception.js';

@Injectable()
class UserService {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        private readonly eventEmitter: EventEmitter2,
        private readonly jwtService: JwtService,
    ) { }

    // helper
    private publishEvents(user: UserTemp): void {
        const events = user.getDomainEvents();
        for (const event of events) {
            this.eventEmitter.emit(event.constructor.name, event);
        }
        user.clearEvents();
    }

    // register
    async register(dto: CreateUserDto): Promise<UserResponseDto> {
        const emailVO = Email.create(dto.email);
        if (await this.userRepository.existsByEmail(emailVO)) {
            throw InvalidEmailException.ex(EmailErrorReason.EXISTS, dto.email);
        }

        const usernameVO = Username.create(dto.username);
        if (!usernameVO) {
            throw new BadRequestException('Username is required and cannot be empty.');
        }
        if (await this.userRepository.existsByUsername(usernameVO)) {
            throw InvalidUsernameException.ex(UsernameErrorReason.EXISTS, dto.username)
        }

        const phoneVO = Phonenumber.create(dto.phoneNumber);
        if (await this.userRepository.existsByPhone(phoneVO)) {
            throw InvalidPhonenumberException.ex(PhonenumberErrorReason.EXISTS, dto.phoneNumber);
        }

        const user = await UserTemp.create({
            username: dto.username,
            fullname: dto.fullName,
            email: dto.email,
            password: dto.password,
            phonenumber: dto.phoneNumber,
        });

        await this.userRepository.save(user);
        this.publishEvents(user); 
        return UserResponseMapper.toResponse(user);
    }

    // register
    async registerCustomer(dto: RegisterCustomerDto): Promise<UserResponseDto> {
        const phoneVO = Phonenumber.create(dto.phoneNumber);
        if (await this.userRepository.existsByPhone(phoneVO)) {
            throw new ConflictException('This phone number is already registered.');
        }

        const user = await UserTemp.create({
            fullname: dto.fullName,
            phonenumber: dto.phoneNumber,
            email: dto.email,
            role: UserRole.USER,
            status: UserStatus.ACTIVE,
        });

        await this.userRepository.save(user);
        this.publishEvents(user);
        return UserResponseMapper.toResponse(user);
    }

    // login
    async checkLoginIdentifier(dto: CheckLoginIdentifierDto): Promise<{ role: string, requiresPassword: boolean }> {
        let user = null;

        if (/^(\+98|0098|98|0)?9[0-9]{9}$/.test(dto.identifier)) {
            user = await this.userRepository.findByPhone(Phonenumber.create(dto.identifier));
        }
        else if (dto.identifier.includes('@')) {
            user = await this.userRepository.findByEmail(Email.create(dto.identifier));
        }
        else {
            const usernameVO = Username.create(dto.identifier);
            if (usernameVO) {
                user = await this.userRepository.findByUsername(usernameVO);
            }
        }

        if (!user) throw new NotFoundException('User with this information not found.');

        const role = user.getRole().getValue();
        return {
            role: role,
            requiresPassword: role === UserRole.ADMIN || role === UserRole.SELLER
        };
    }

    // helper
    private async handlePasswordLogin(user: UserTemp | null, plainPassword: string): Promise<{ accessToken: string, user: UserResponseDto }> {
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await user.getPassword()?.compare(plainPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (!user.canLogin()) {
            throw new UnauthorizedException('Your account is not active. Please contact support.');
        }
        
        const payload = {
            sub: user.getId().toString(),
            role: user.getRole().getValue()
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            accessToken,
            user: UserResponseMapper.toResponse(user),
        };
    }

    // login
    async loginEP(dto: LoginWithEmailPassword): Promise<{ accessToken: string, user: UserResponseDto }> {
        const emailVO = Email.create(dto.email);
        const user = await this.userRepository.findByEmail(emailVO);
        return this.handlePasswordLogin(user, dto.password)
    }

    // login
    async loginPP(dto: LoginWithPhonePasswordDto): Promise<{ accessToken: string, user: UserResponseDto }> {
        const phonenumberVO = Phonenumber.create(dto.phoneNumber);
        const user = await this.userRepository.findByPhone(phonenumberVO);
        return this.handlePasswordLogin(user, dto.password)
    }

    // login
    async loginUP(dto: LoginWithUsernamePasswordDto): Promise<{ accessToken: string, user: UserResponseDto }> {
        const usernameVO = Username.create(dto.username);
        if (!usernameVO) {
            throw new UnauthorizedException('Invalid login credentials.');
        }
        const user = await this.userRepository.findByUsername(usernameVO);
        return this.handlePasswordLogin(user, dto.password)
    }

    // admin
    async promoteUser(adminId: string, targetUserId: string, dto: PromoteUserDto): Promise<UserResponseDto> {
        const admin = await this.userRepository.findById(UserId.createFromPlain(adminId));
        const targetUser = await this.userRepository.findById(UserId.createFromPlain(targetUserId));

        if (!admin || !targetUser) throw new NotFoundException('User not found.');

        if (!admin.getRole().canManageUsers()) throw new ForbiddenException();
        if (targetUser.getRole().getValue() !== UserRole.USER) {
            throw new BadRequestException('Only normal users can be promoted.');
        }

        await targetUser.assignCredentials(dto.username, dto.password); 
        targetUser.changeRole(dto.newRole, admin);

        await this.userRepository.save(targetUser);
        this.publishEvents(targetUser); 
        return UserResponseMapper.toResponse(targetUser);
    }

    // admin
    async blockUser(adminId: string, targetUserId: string, reason: string): Promise<UserResponseDto> {
        const admin = await this.userRepository.findById(UserId.createFromPlain(adminId));
        const targetUser = await this.userRepository.findById(UserId.createFromPlain(targetUserId));
        if (!admin || !targetUser) throw new UserNotFoundException();
        
        targetUser.block(reason, admin);
        await this.userRepository.save(targetUser);
        this.publishEvents(targetUser); 
        return UserResponseMapper.toResponse(targetUser);
    }

    // admin
    async unblockUser(adminId: string, targetUserId: string): Promise<UserResponseDto> {
        const admin = await this.userRepository.findById(UserId.createFromPlain(adminId));
        const targetUser = await this.userRepository.findById(UserId.createFromPlain(targetUserId));
        if (!admin || !targetUser) throw new UserNotFoundException();
        
        targetUser.unblock(admin);
        await this.userRepository.save(targetUser);
        this.publishEvents(targetUser); 
        return UserResponseMapper.toResponse(targetUser);
    }

    // admin
    async changeUserRole(adminId: string, targetUserId: string, dto: ChangeRoleDto): Promise<UserResponseDto> {
        const admin = await this.userRepository.findById(UserId.createFromPlain(adminId));
        const targetUser = await this.userRepository.findById(UserId.createFromPlain(targetUserId));
        if (!admin || !targetUser) throw new UserNotFoundException();
        
        targetUser.changeRole(dto.newRole, admin);
        await this.userRepository.save(targetUser);
        this.publishEvents(targetUser); 
        return UserResponseMapper.toResponse(targetUser);
    }

    // profile
    async activateUser(dto: ActivateUserDto): Promise<UserResponseDto> {
        const emailVO = Email.create(dto.email);
        const user = await this.userRepository.findByEmail(emailVO);

        if (!user) {
            throw new UserNotFoundExceptionEP(dto.email);
        }
        user.activate();
        await this.userRepository.save(user);
        this.publishEvents(user); 
        return UserResponseMapper.toResponse(user);
    }

    // profile
    async getProfile(userId: string): Promise<UserResponseDto> {
        const user = await this.userRepository.findById(UserId.createFromPlain(userId));
        if (!user) {
            throw new UserNotFoundException(userId);
        }
        return UserResponseMapper.toResponse(user);
    }

    // profile
    async updateProfile(userId: string, dto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.findById(UserId.createFromPlain(userId));
        if (!user) {
            throw new UserNotFoundException(userId);
        }
        
        if (dto.username) {
            user.changeUsername(dto.username);
        }
        if (dto.fullname) {
            user.changeFullName(dto.fullname);
        }
        
        await this.userRepository.save(user);
        this.publishEvents(user); 
        return UserResponseMapper.toResponse(user);
    }

    // profile
    async changePassword(userId: string, dto: ChangePasswordDto): Promise<{ message: string }> {
        const user = await this.userRepository.findById(UserId.createFromPlain(userId));
        if (!user) {
            throw new UserNotFoundException(userId);
        }
        
        await user.changePassword(dto.currentPassword, dto.newPassword);
        await this.userRepository.save(user);
        this.publishEvents(user); 
        return { message: 'Password changed successfully. Please log in again' };
    }
}

export { UserService }