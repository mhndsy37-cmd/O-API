import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../../Domain/Entities/Category.entity.js';

import { CategoryDocument, CategorySchema } from '../Schemas/Category.schema.js';
import { ICategoryRepository } from '../../Domain/Repositories/Category.repository.interface.js';

@Injectable()
class CategoryRepositoryImpl implements ICategoryRepository {
    constructor(
        @InjectModel(CategorySchema.name)
        private readonly categoryModel: Model<CategoryDocument>,
    ) { }
    async findAll(): Promise<Category[]> {
        const docs = await this.categoryModel.find().exec();
        return docs.map(doc => this.toDomain(doc));
    }
    async delete(id: string): Promise<void> {
        await this.categoryModel.deleteOne({ _id: id });
    }
    async findBySlug(slug: string): Promise<Category | null> {
        const doc = await this.categoryModel.findOne({ slug });
        if (!doc) return null;
        return this.toDomain(doc);
    }
    async findById(id: string): Promise<Category | null> {
        const doc = await this.categoryModel.findById(id);
        if (!doc) return null;
        return this.toDomain(doc);
    }
    async save(category: Category): Promise<void> {
        await this.categoryModel.updateOne(
            { _id: category.getId() },
            {
                $set: {
                    name: category.getName(),
                    slug: category.getSlug(),
                    parentId:category.getParentId(),
                    description: category.getDescription(),

                }
            },
            { upsert: true }
        );
    }
    private toDomain(doc: CategoryDocument): Category {
        const category = Category.restore(doc);
        return category;
    }
}
export{CategoryRepositoryImpl}