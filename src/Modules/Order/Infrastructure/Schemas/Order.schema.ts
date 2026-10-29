import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderStatus } from '../../Domain/Enums/OrderStatus.enum.js';

@Schema({ _id: false }) 
class OrderItemSchema {
    @Prop({ type: String, required: true })
    productId!: string;

    @Prop({ type: String, required: true })
    title!: string;

    @Prop({ type: Number, required: true })
    price!: number;

    @Prop({ type: Number, required: true, min: 1 })
    quantity!: number;
}

type OrderDocument = HydratedDocument<OrderSchema>;

@Schema({ timestamps: true, collection: 'orders' })
class OrderSchema {
    @Prop({ type: String, required: true, index: true })
    userId!: string;

    @Prop({ type: [OrderItemSchema], required: true })
    items!: OrderItemSchema[]; 

    @Prop({ type: Number, required: true }) 
    totalPrice!: number;

    @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
    status!: OrderStatus;

    @Prop({ type: String, default: null })
    paymentAuthority!: string | null;

    createdAt?: Date;
    updatedAt?: Date;
}
const OrderSchemaFactory = SchemaFactory.createForClass(OrderSchema);

export{OrderItemSchema,OrderSchemaFactory,OrderSchema,OrderDocument}