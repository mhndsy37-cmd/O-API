import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProductRepository } from '../../Domain/Repositories/Product.repository.interface.js';
import { Product } from '../../Domain/Entities/Product.entity.js';
import { ProductId } from '../../Domain/ValueObjects/ProductId.vo.js';
import { Title } from '../../Domain/ValueObjects/Title.vo.js';

import { ProductSchema, ProductDocument } from '../Schemas/Product.schema.js';
import { ProductInfrastructureMapper } from '../Mappers/Product.mapper.js';
import { ProductStatus } from '../../Domain/Enums/ProductStatus.enum.js';

@Injectable()
class ProductRepositoryImpl implements IProductRepository {
    constructor(
        @InjectModel(ProductSchema.name)
        private readonly productModel: Model<ProductDocument>,
    ) { }

    async existsByTitle(title: Title): Promise<boolean> {
        const count = await this.productModel.countDocuments({ title: title.getValue() });
        return count > 0;
    }

    async save(product: Product): Promise<void> {
        const data = ProductInfrastructureMapper.toPersistence(product);
        await this.productModel.updateOne(
            { _id: product.getId().getValue() },
            { $set: data },
            { upsert: true }
        );
    }

    async findById(id: ProductId): Promise<Product | null> {
        const doc = await this.productModel.findById(id.getValue());
        if (!doc) return null;
        return ProductInfrastructureMapper.toDomain(doc);
    }
    private buildVisibilityQuery(options?: { status?: ProductStatus, viewerRole?: string, viewerId?: string }) {
        let query: any = {};
        if (options?.status) {
            query.status = options.status;
        }
        if (options?.viewerRole === 'ADMIN') {
            return query;
        }
        if (options?.viewerRole === 'SELLER') {
            if (query.status) {
                query.$or = [
                    { status: query.status },
                    { sellerId: options.viewerId, status: query.status }
                ];
                delete query.status;
            } else {
                query.$or = [
                    { status: ProductStatus.PUBLISHED },
                    { sellerId: options.viewerId }
                ];
            }
            return query;
        }
        if (!query.status) {
            query.status = ProductStatus.PUBLISHED;
        }
        console.log("3️⃣ Repository Options:", options);
        return query;
    }

    async findAll(options?: any): Promise<Product[]> {
        let query = this.buildVisibilityQuery(options);

        if (options?.search) {
            query.title = { $regex: options.search, $options: 'i' };
        }

        const docs = await this.productModel
            .find(query)
            .skip(options?.skip || 0)
            .limit(options?.limit || 20)
            .exec();

        return docs.map(doc => ProductInfrastructureMapper.toDomain(doc));
    }

    async count(options?: any): Promise<number> {
        let query = this.buildVisibilityQuery(options);
        return await this.productModel.countDocuments(query);
    }
    async delete(id: ProductId): Promise<void> {
        await this.productModel.deleteOne({ _id: id.getValue() });
    }
}
export { ProductRepositoryImpl }