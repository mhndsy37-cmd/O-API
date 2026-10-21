import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './Application/Controllers/User.controller.js';
import { UserService } from './Application/Services/User.service.js';
import { UserSchema, UserSchemaFactory } from './Infrastructure/Schemas/User.schema.js';
import { UserRepositoryImpl } from './Infrastructure/Repositories/User.repsitory.impl.js';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserSchema.name, schema: UserSchemaFactory },
        ]),
           JwtModule.register({
            secret: 'MY_SUPER_SECRET_KEY_123', // (.env)
            signOptions: { expiresIn: '1d' },  
        }),
    ],
    
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: 'IUserRepository',
            useClass: UserRepositoryImpl,
        },
    ],
    exports: [UserService],
})
export class UserModule {}