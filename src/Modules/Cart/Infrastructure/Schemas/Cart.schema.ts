import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type CartDocument = HydratedDocument<CartSchema>;

@Schema({ _id: false })
class CartItemSchema {
    @Prop({ type: String, required: true })
    productId!: string;

    @Prop({ type: Number, required: true, min: 1 })
    quantity!: number;
}

@Schema({ timestamps: true, collection: 'carts' })
class CartSchema {
    @Prop({ type: String, required: true, unique: true })
    userId!: string;

    @Prop({ type: [CartItemSchema], default: [] })
    items!: CartItemSchema[];

    createdAt?: Date;
    updatedAt?: Date;
}

const CartSchemaFactory = SchemaFactory.createForClass(CartSchema);

export{CartDocument,CartItemSchema,CartSchema,CartSchemaFactory}