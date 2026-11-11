import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../../Domain/Enums/Role.enum.js';
import { UserStatus } from '../../Domain/Enums/Status.enum.js';

// type
type UserDocument = HydratedDocument<UserSchema>;

// schema
@Schema({ timestamps: true, collection: 'users' })
class UserSchema {
    // prop
    @Prop({ type: String, required: true, trim: true })
    fullName!: string;

    // prop
    @Prop({ type: String, required: false, default: null, unique: true, sparse: true })
    username?: string;

    // prop
    @Prop({ type: String, required: false, default: null, unique: true, sparse: true })
    email?: string;

    // prop
    @Prop({ type: String, required: false, default: null })
    password?: string;

    // prop
    @Prop({ type: String, required: true, unique: true, trim: true })
    phoneNumber!: string;

    // prop
    @Prop({ type: String, enum: UserRole, default: UserRole.USER })
    role!: UserRole;

    // prop
    @Prop({ type: String, enum: UserStatus, default: UserStatus.PENDING })
    status!: UserStatus;

    // prop
    createdAt!: Date;

    // prop
    updatedAt!: Date;
}

// factory
const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);

export { type UserDocument, UserSchemaFactory, UserSchema }