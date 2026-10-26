import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './Application/Controllers/Product.controller.js';
import { ProductService } from './Application/Services/Product.service.js';
import { ProductSchema, ProductSchemaFactory } from './Infrastructure/Schemas/Product.schema.js';
import { ProductRepositoryImpl } from './Infrastructure/Repositories/Product.repository.impl.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';
import { CategoryModule } from './Category.module.js';
import { LocalStorageService } from '../../Shared/Storage/LocalStorage.service.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProductSchema.name, schema: ProductSchemaFactory },
        ]),
        AuthSharedModule,
        CategoryModule
    ],
    controllers: [ProductController],
    providers: [
        ProductService,
        {
            provide: 'IProductRepository',
            useClass: ProductRepositoryImpl,
        },
         {
            provide: 'IStorageService',
            useClass: LocalStorageService,
        },
    ],
    exports: [ProductService,
        'IProductRepository',
    ],
})
export class ProductModule {}