import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from './Application/Controllers/Category.controller.js';
import { CategoryService } from './Application/Services/Category.service.js';
import { CategorySchema, CategorySchemaFactory } from './Infrastructure/Schemas/Category.schema.js';
import { CategoryRepositoryImpl } from './Infrastructure/Repositories/Category.repository.impl.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: CategorySchema.name, schema: CategorySchemaFactory },
        ]),
        AuthSharedModule
    ],
    controllers: [CategoryController],
    providers: [
        CategoryService,
        {
            provide: 'ICategoryRepository',
            useClass: CategoryRepositoryImpl,
        },
    ],
    exports: ['ICategoryRepository'], 
})
export class CategoryModule {}