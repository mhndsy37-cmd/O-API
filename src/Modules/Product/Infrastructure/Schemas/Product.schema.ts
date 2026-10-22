import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductStatus } from '../../Domain/Enums/ProductStatus.enum.js';

type ProductDocument = HydratedDocument<ProductSchema>;

@Schema({ timestamps: true, collection: 'products' })
class ProductSchema {
    @Prop({ type: String, required: true, trim: true })
    title!: string;

    @Prop({ type: String, required: true })
    description!: string;

    @Prop({ type: String, required: true, trim: true })
    sellerName!: string;

    @Prop({ type: String, required: true, trim: true, index: true  })
    sellerId!: string;

    @Prop({ type: Number, required: true, min: 0 })
    price!: number;

    @Prop({ type: Number, required: true, min: 0 })
    stock!: number;

    @Prop({ type: String, enum: ProductStatus, default: ProductStatus.DRAFT })
    status!: ProductStatus;
    @Prop({type: String, required: false, trim: true})
    categoryId!: string
    
    createdAt?: Date;
    updatedAt?: Date;
}
const ProductSchemaFactory = SchemaFactory.createForClass(ProductSchema);
export { type ProductDocument, ProductSchema, ProductSchemaFactory }