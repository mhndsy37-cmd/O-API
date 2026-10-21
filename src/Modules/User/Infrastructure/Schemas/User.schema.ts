import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../../Domain/Enums/Role.enum.js';
import { UserStatus } from '../../Domain/Enums/Status.enum.js';

type UserDocument = HydratedDocument<UserSchema>;

@Schema({ timestamps: true, collection: 'users' })
class UserSchema {
    @Prop({type: String , required: true, unique: true, lowercase: true, trim: true })
    username!: string;
    @Prop({type: String, required: true, trim: true })
    fullName!: string;
    @Prop({type: String, required: true, unique: true, lowercase: true, trim: true })
    email!: string;
    @Prop({type: String, required: true })
    password!: string;
    @Prop({type: String, required: true, unique: true, trim: true })
    phoneNumber!: string;
    @Prop({ type: String, enum: UserRole, default: UserRole.USER })
    role!: UserRole;
    @Prop({ type: String, enum: UserStatus, default: UserStatus.PENDING })
    status!: UserStatus;
    createdAt!: Date;
    updatedAt!: Date;
}
const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
export{type UserDocument,UserSchemaFactory,UserSchema}