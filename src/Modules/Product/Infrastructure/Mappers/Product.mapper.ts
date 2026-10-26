import { ProductDocument } from '../Schemas/Product.schema.js';
import { Product } from '../../Domain/Entities/Product.entity.js';
import { ProductStatus } from '../../Domain/Enums/ProductStatus.enum.js';

class ProductInfrastructureMapper {
    static toDomain(doc: ProductDocument): Product {
        return Product.restore({
            id: doc._id.toString(),
            title: doc.title,
            description: doc.description,
            sellerId:doc.sellerId,
            price: doc.price,
            stock: doc.stock,
            maxPurchaseLimit:doc.maxPurchaseLimit,
            status: doc.status as ProductStatus,
            categoryId:doc.categoryId,
            createdAt: doc.createdAt || new Date(),
            
            updatedAt: doc.updatedAt??new Date(),
        });
    }
    static toPersistence(product: Product): any {
        return {
            _id: product.getId().getValue(),
            title: product.getTitle().getValue(),
            description: product.getDescription(),
            sellerId:product.getSellerId(),
            price: product.getPrice().getValue(),
            stock: product.getStock().getValue(),
            status: product.getStatus(),
            createdAt: product.getCreatedAt(),
            updatedAt: product.getUpdatedAt(),
        };
    }
}
export{ProductInfrastructureMapper}