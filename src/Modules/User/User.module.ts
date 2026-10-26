import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './Application/Controllers/User.controller.js';
import { UserService } from './Application/Services/User.service.js';
import { UserSchema, UserSchemaFactory } from './Infrastructure/Schemas/User.schema.js';
import { UserRepositoryImpl } from './Infrastructure/Repositories/User.repsitory.impl.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';
@Module({
    
    imports: [
        MongooseModule.forFeature([
            { name: UserSchema.name, schema: UserSchemaFactory },
        ]),
          AuthSharedModule
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