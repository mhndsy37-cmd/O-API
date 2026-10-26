import { Inject, Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IProductRepository } from '../../Domain/Repositories/Product.repository.interface.js';
import { Product } from '../../Domain/Entities/Product.entity.js';
import { Title } from '../../Domain/ValueObjects/Title.vo.js';
import { CreateProductDto } from '../Dtos/ProductCreate.dto.js';
import { ProductResponseDto } from '../Dtos/ProductResponse.dto.js';
import { ProductResponseMapper } from '../Mappers/Product.mapper.js';
import { ProductListResponseDto } from '../Dtos/ProductListResponse.dto.js';
import { ProductId } from '../../Domain/ValueObjects/ProductId.vo.js';
import { UpdateProductDto } from '../Dtos/UpdateProduct.dto.js';
import { ProductReduceStock } from '../../Domain/Enums/ProductReduceStock.enum.js';
import { RestockProductDto } from '../Dtos/RestockProduct.dto.js';
import { ICategoryRepository } from '../../Domain/Repositories/Category.repository.interface.js';
import { IStorageService } from '../../../../Shared/Storage/IStorage.service.js';

@Injectable()
class ProductService {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        @Inject('ICategoryRepository') private readonly categoryRepository: ICategoryRepository,
         @Inject('IStorageService') private readonly storageService: IStorageService,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async createProduct(dto: CreateProductDto, userId: string): Promise<ProductResponseDto> {
        const titleVO = Title.create(dto.title);
        const category = await this.categoryRepository.findById(dto.categoryId);
        if (await this.productRepository.existsByTitle(titleVO)) {
            throw new ConflictException('A product with this title has already been registered.');
        }
        if (!category) {
            throw new NotFoundException('The selected category is not valid.');
        }
        const product = Product.create({
            title: dto.title,
            description: dto.description,
            sellerId: userId,
            price: dto.price,
            stock: dto.stock,
            maxPurchaseLimit:dto.maxPurchaseLimit,
            images:[],
            categoryId: dto.categoryId
        });
        await this.productRepository.save(product);
        const events = product.getDomainEvents();
        for (const event of events) {
            this.eventEmitter.emit(event.constructor.name, event);
        }
        product.clearEvents();
        return ProductResponseMapper.toResponse(product);
    }
    async getProductById(id: string, user?: any): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(ProductId.createFromPlain(id));
        console.log(product)
        console.log(user)

        if (!product) {
            throw new NotFoundException('No product with this ID was found.');
        }

        if (!product.canBeViewedBy(user?.role, user?.sub)) {
            throw new NotFoundException('No product with this ID was found.');
        }

        return ProductResponseMapper.toResponse(product);
    }
    async getAllProducts(query: any, user?: any): Promise<ProductListResponseDto> {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;

        const viewerRole = user?.role;
        const viewerId = user?.sub;
        const products = await this.productRepository.findAll({
            skip,
            limit,
            search: query.search,
            status: query.status as any,
            viewerRole,
            viewerId,
        });

        const total = await this.productRepository.count({
            status: query.status as any,
            viewerRole,
            viewerId,
        });

        return {
            data: products.map(product => ProductResponseMapper.toResponse(product)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async updateProduct(id: string, dto: UpdateProductDto, userId: string, userRole: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(ProductId.createFromPlain(id));
        if (!product) throw new NotFoundException('Product not found.');
        product.ensureCanBeModifiedBy(userId, userRole);
        if (dto.title !== undefined) product.changeTitle(dto.title);
        if (dto.description !== undefined) product.changeDescription(dto.description);
        if (dto.price !== undefined) product.changePrice(dto.price);
        if (dto.stock !== undefined) {
            const currentStock = product.getStock().getValue();
            if (dto.stock > currentStock) {
                product.addStock(dto.stock - currentStock);
            } else if (dto.stock < currentStock) {
                product.reduceStock(currentStock - dto.stock, ProductReduceStock.ADJUSTMENT);
            }
        }

        await this.productRepository.save(product);
        this.publishEvents(product);

        return ProductResponseMapper.toResponse(product);
    }
    async publishProduct(id: string, userId: string, userRole: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(ProductId.createFromPlain(id));
        if (!product) throw new NotFoundException('Product not found.');
        product.ensureCanBeModifiedBy(userId, userRole);
        product.publish();

        await this.productRepository.save(product);
        this.publishEvents(product);

        return ProductResponseMapper.toResponse(product);
    }
    private publishEvents(product: Product) {
        const events = product.getDomainEvents();
        for (const event of events) {
            this.eventEmitter.emit(event.constructor.name, event);
        }
        product.clearEvents();
    }
    async restockProduct(id: string, dto: RestockProductDto, userId: string, userRole: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(ProductId.createFromPlain(id));
        if (!product) throw new NotFoundException('Product not found.');
        product.ensureCanBeModifiedBy(userId, userRole);
        product.addStock(dto.amount);
        await this.productRepository.save(product);
        this.publishEvents(product);

        return ProductResponseMapper.toResponse(product);
    }
    async uploadProductImage(
        id: string, 
        file: Express.Multer.File, 
        userId: string, 
        userRole: string
    ): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(ProductId.createFromPlain(id));
        if (!product) throw new NotFoundException('The Product not Found.');

        product.ensureCanBeModifiedBy(userId, userRole);
        const imageUrl = await this.storageService.uploadFile(file, 'products');
        product.addImage(imageUrl);
        await this.productRepository.save(product);
        this.publishEvents(product);

        return ProductResponseMapper.toResponse(product);
    }
    async archiveProduct(id: string, userId: string, userRole: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(ProductId.createFromPlain(id));
        if (!product) throw new NotFoundException('Product not found.');
        product.ensureCanBeModifiedBy(userId, userRole);
        product.archive();

        await this.productRepository.save(product);
        this.publishEvents(product);

        return ProductResponseMapper.toResponse(product);
    }
    async changeProductCategory(
        productId: string, 
        categoryId: string, 
        userId: string, 
        userRole: string
    ): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(ProductId.createFromPlain(productId));
        if (!product) throw new NotFoundException('The Product not found.');

        product.ensureCanBeModifiedBy(userId, userRole);

        const category = await this.categoryRepository.findById(categoryId);
        if (!category) throw new NotFoundException('The selected category is not valid.');

        product.changeCategory(categoryId);
        
        await this.productRepository.save(product);
        this.publishEvents(product);

        return ProductResponseMapper.toResponse(product);
    }
}
export { ProductService }