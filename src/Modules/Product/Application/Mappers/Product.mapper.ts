import { Product } from '../../Domain/Entities/Product.entity.js';
import { ProductResponseDto } from '../Dtos/ProductResponse.dto.js';

class ProductResponseMapper {
    static toResponse(product: Product): ProductResponseDto {
        const dto = new ProductResponseDto();
        const updatedAt = product.getUpdatedAt();
        dto.id = product.getId().toString();
        dto.title = product.getTitle().getValue();
        dto.description = product.getDescription();
        dto.sellerId=product.getSellerId()
        dto.price = product.getPrice().getValue();
        dto.stock = product.getStock().getValue();
        dto.images = product.getImages();
        dto.status = product.getStatus();
        dto.createdAt = product.getCreatedAt();
        if (updatedAt) {
            dto.updatedAt = updatedAt;
        }
        return dto;
    }
}
export { ProductResponseMapper }