import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type CategoryDocument = HydratedDocument<CategorySchema>;

@Schema({ timestamps: true, collection: 'category' })
class CategorySchema{
    @Prop({ type: String, required: true })
    name!: string;

    @Prop({ type: String, required: true, unique: true })
    slug!: string;

    @Prop({ type: String, required: false, default: null })
    parentId?: string;

    @Prop({ type: String, required: false })
    description?: string;
}
const CategorySchemaFactory = SchemaFactory.createForClass(CategorySchema);
export{CategoryDocument,CategorySchemaFactory,CategorySchema}