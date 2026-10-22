import { Product } from '../Entities/Product.entity.js';
import { ProductId } from '../ValueObjects/ProductId.vo.js';
import { Title } from '../ValueObjects/Title.vo.js';
import { ProductStatus } from '../Enums/ProductStatus.enum.js';

interface IProductRepository {
    findById(id: ProductId): Promise<Product | null>;
    findAll(options?: {
        skip?: number | undefined;
        limit?: number | undefined;
        status?: ProductStatus | undefined;
        search?: string | undefined;
        viewerRole?: string | undefined;
        viewerId?: string | undefined;
    }): Promise<Product[]>;
    existsByTitle(title: Title): Promise<boolean>;
    save(product: Product): Promise<void>;
    delete(id: ProductId): Promise<void>;
    count(options?: {
        status?: ProductStatus
        viewerRole?: string | undefined; 
        viewerId?: string | undefined;
    }): Promise<number>;
}
export { IProductRepository }