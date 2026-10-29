import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PaymentStatus } from '../../Domain/Enums/PaymentStatus.enum.js';
import { PaymentGateway } from '../../Domain/Enums/PaymentGateway.enum.js';

type PaymentDocument = HydratedDocument<PaymentSchema>;

@Schema({ timestamps: true, collection: 'payments' })
class PaymentSchema {
    @Prop({ type: String, required: true })
    orderId!: string;

    @Prop({ type: Number, required: true })
    amount!: number;

    @Prop({ type: String, enum: PaymentGateway, required: true })
    gateway!: PaymentGateway;

    @Prop({ type: String, default: null })
    authority!: string | null;

    @Prop({ type: String, default: null })
    refId!: string | null;

    @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
    status!: PaymentStatus;

    createdAt?: Date;
    updatedAt?: Date;
}
const PaymentSchemaFactory = SchemaFactory.createForClass(PaymentSchema);

export{PaymentDocument,PaymentSchemaFactory,PaymentSchema}