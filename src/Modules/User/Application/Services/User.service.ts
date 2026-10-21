import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IUserRepository } from '../../Domain/Repositories/User.repository.interface.js';
import { CreateUserDto } from '../Dtos/CreateUser.dto.js';
import { UserResponseDto } from '../Dtos/UserResponse.dto.js';
import { UserTemp } from '../../Domain/Entities/User.entity.js';
import { Email } from '../../Domain/ValueObjects/Email.vo.js';
import { Username } from '../../Domain/ValueObjects/Username.vo.js';
import { EmailErrorReason, InvalidEmailException } from '../../Domain/Exceptions/Email.exception.js';
import { InvalidUsernameException, UsernameErrorReason } from '../../Domain/Exceptions/Username.exception.js';
import { Phonenumber } from '../../Domain/ValueObjects/Phonenumber.vo.js';
import { InvalidPhonenumberException, PhonenumberErrorReason } from '../../Domain/Exceptions/Phonenumber.exception.js';
import { UserResponseMapper } from '../../Infrastructure/Mappers/User.mapper.js';
import { JwtService } from '@nestjs/jwt';
import { LoginWithEmailPassword } from '../Dtos/LoginUserWithEmailPassword.dto.js';
import { UnauthorizedException } from '@nestjs/common';
import { ActivateUserDto } from '../Dtos/ActivateUser.dto.js';
import { UserNotFoundExceptionEP } from '../../Domain/Exceptions/UserNotFoundExceptionEP.exception.js';
import { LoginWithPhonePasswordDto } from '../Dtos/LoginUserWithPhonenumberPassword.dto.js';
import { LoginWithUsernamePasswordDto } from '../Dtos/LoginUserWithUsernamePassword.dto.js';
@Injectable()
class UserService {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        private readonly eventEmitter: EventEmitter2,
        private readonly jwtService: JwtService,
    ) { }
    async register(dto: CreateUserDto): Promise<UserResponseDto> {
        //validition email
        const emailVO = Email.create(dto.email);
        if (await this.userRepository.existsByEmail(emailVO)) {
            throw InvalidEmailException.ex(EmailErrorReason.EXISTS, dto.email);
        }
        //validition username
        const usernameVO = Username.create(dto.username);
        if (await this.userRepository.existsByUsername(usernameVO)) {
            throw InvalidUsernameException.ex(UsernameErrorReason.EXISTS, dto.username)
        }

        const phoneVO = Phonenumber.create(dto.phoneNumber);
        if (await this.userRepository.existsByPhone(phoneVO)) {
            throw InvalidPhonenumberException.ex(PhonenumberErrorReason.EXISTS, dto.phoneNumber);
        }
        //create user
        const user = await UserTemp.create({
            username: dto.username,
            fullname: dto.fullName,
            email: dto.email,
            password: dto.password,
            phonenumber: dto.phoneNumber,
        });
        //save
        await this.userRepository.save(user);
        //relese event
        const events = user.getDomainEvents();
        for (const event of events) {
            this.eventEmitter.emit(event.constructor.name, event);
        }
        user.clearEvents();
        //output
        // return UserResponseDto.arguments
        return UserResponseMapper.toResponse(user);

    }
    private async handlePasswordLogin(user: UserTemp | null, plainPassword: string): Promise<{ accessToken: string, user: UserResponseDto }> {
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await user.getPassword().compare(plainPassword);
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
    async loginEP(dto: LoginWithEmailPassword): Promise<{ accessToken: string, user: UserResponseDto }> {
        const emailVO = Email.create(dto.email);
        const user = await this.userRepository.findByEmail(emailVO);
        return this.handlePasswordLogin(user,dto.password)
    }
    async loginPP(dto: LoginWithPhonePasswordDto): Promise<{ accessToken: string, user: UserResponseDto }> {
        const phonenumberVO = Phonenumber.create(dto.phoneNumber);
        const user = await this.userRepository.findByPhone(phonenumberVO);
        return this.handlePasswordLogin(user,dto.password)
    }
    async loginUP(dto: LoginWithUsernamePasswordDto): Promise<{ accessToken: string, user: UserResponseDto }> {
        const usernameVO = Username.create(dto.username);
        const user = await this.userRepository.findByUsername(usernameVO);
        return this.handlePasswordLogin(user,dto.password)
    }
    async activateUser(dto: ActivateUserDto): Promise<UserResponseDto> {
        const emailVO = Email.create(dto.email);
        const user = await this.userRepository.findByEmail(emailVO);

        if (!user) {
            throw new UserNotFoundExceptionEP(dto.email);
        }
        user.activate();
        await this.userRepository.save(user);
        const events = user.getDomainEvents();
        for (const event of events) {
            this.eventEmitter.emit(event.constructor.name, event);
        }
        user.clearEvents();
        return UserResponseMapper.toResponse(user);
    }
}
export { UserService }