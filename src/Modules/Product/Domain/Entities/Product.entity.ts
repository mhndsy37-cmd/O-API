import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { ProductId } from '../ValueObjects/ProductId.vo.js';
import { Title } from '../ValueObjects/Title.vo.js';
import { Price } from '../ValueObjects/Price.vo.js';
import { Stock } from '../ValueObjects/Stock.vo.js';
import { ProductStatus } from '../Enums/ProductStatus.enum.js';
import { CreateProductProps, RestoreProductProps } from './Product.props.js';
import { ProductCreatedEvent } from '../Events/ProductCreate.event.js';
import { ProductOutOfStockEvent } from '../Events/ProductOutofStock.event.js';
import { ProductStockChangedEvent } from '../Events/ProductStockChanged.event.js';
import { ProductDescriptionChangedEvent } from '../Events/ProductDescriptionChanged.event.js';
import { ProductTitleChangedEvent } from '../Events/ProductTitleChanged.event.js';
import { ProductReduceStock } from '../Enums/ProductReduceStock.enum.js';
import { ForbiddenException } from '../Exceptions/Forbidden.exception.js';
import { MaxUploadImagesException } from '../Exceptions/MaxUploadImages.exception.js';


class Product extends AggregateRoot {
    private constructor(
        private readonly id: ProductId,
        private title: Title,
        private description: string,
        private sellerId:string,
        private price: Price,
        private stock: Stock,
        private maxPurchaseLimit: number,
        private images: string[],
        private status: ProductStatus,
        private categoryId: string,
        private readonly createdAt: Date,
        private updatedAt?: Date,
    ) {
        super();
    }
    static create(props: CreateProductProps): Product {
        const product = new Product(
            ProductId.generate(),
            Title.create(props.title),
            props.description,
            props.sellerId,
            Price.create(props.price),
            Stock.create(props.stock),
            props.maxPurchaseLimit,
            props.images || [],
            ProductStatus.DRAFT,
            props.categoryId,
            new Date(),
        );
        product.addEvent(new ProductCreatedEvent(
            product.getId().toString(),
            product.getTitle().getValue(),
            product.getPrice().getValue(),
            product.getStock().getValue(),
            product.getSellerId()
        ));
        return product;
    }
    static restore(props: RestoreProductProps): Product {
        return new Product(
            ProductId.createFromPlain(props.id),
            Title.create(props.title),
            props.description,
            props.sellerId,
            Price.create(props.price),
            Stock.create(props.stock),
            props.maxPurchaseLimit,
            props.images || [],
            props.status,
            props.categoryId,
            props.createdAt,
            props.updatedAt,
        );
    }
    //title
    changeTitle(newTitle: string): void {
        const titleVO = Title.create(newTitle);
        if (this.title.equals(titleVO)) {
            return;
        }

        const oldTitle = this.title.getValue();
        this.title = titleVO;
        this.touch();

        this.addEvent(new ProductTitleChangedEvent(
            this.id.toString(),
            oldTitle,
            newTitle
        ));
    }
    //descripttion
    changeDescription(newDescription: string): void {
        const trimmedDesc = newDescription?.trim() ?? '';

        if (this.description === trimmedDesc) {
            return;
        }

        const oldDesc = this.description;
        this.description = trimmedDesc;
        this.touch();

        this.addEvent(new ProductDescriptionChangedEvent(
            this.id.toString(),
            oldDesc,
            trimmedDesc
        ));
    }
    //price
    changePrice(newPrice: number): void {
        this.price = Price.create(newPrice);
        this.touch();
    }
    //stock
    addStock(amount: number): void {
        const oldStock = this.stock.getValue();
        this.stock = this.stock.increase(amount);
        this.addEvent(new ProductStockChangedEvent(
            this.id.toString(),
            this.title.getValue(),
            oldStock,
            this.stock.getValue(),
            amount,
            ProductReduceStock.RESTOCK
        ));
        this.touch();
    }
    reduceStock(amount: number,stock:ProductReduceStock): void {
        const oldStock = this.stock.getValue();
        this.stock = this.stock.reduce(amount);
        this.addEvent(new ProductStockChangedEvent(
            this.id.toString(),
            this.title.getValue(),
            oldStock,
            this.stock.getValue(),
            -amount,
            stock
        ));
        if (!this.stock.isAvailable()) {
            this.status = ProductStatus.OUT_OF_STOCK;
        }
        this.addEvent(new ProductOutOfStockEvent(
            this.id.toString(),
            this.title.getValue(),
        ));
        this.touch();
    }
    //image
    addImage(imageUrl: string): void {
        if (this.images.length >= 5) {
            throw new MaxUploadImagesException(); 
        }
        this.images.push(imageUrl);
        this.touch();
    }
    removeImage(imageUrl: string): void {
        this.images = this.images.filter(img => img !== imageUrl);
        this.touch();
    }
    getImages(): string[] {
        return this.images;
    }
    //status
    publish(): void {
        if (this.status === ProductStatus.PUBLISHED) {
            throw new Error('Product is already published');
        }
        this.status = ProductStatus.PUBLISHED;
        this.touch();
    }
    archive(): void {
        this.status = ProductStatus.ARCHIVED;
        this.touch();
    }
    changeCategory(newCategoryId:string){
        if (this.categoryId === newCategoryId) return;
        this.categoryId=newCategoryId;
        this.touch()
    }
    isAvailableForPurchase(): boolean {
        return this.status === ProductStatus.PUBLISHED && this.stock.isAvailable();
    }

    canBeViewedBy(viewerRole?: string, viewerId?: string): boolean {
        if (this.status === ProductStatus.PUBLISHED) {
            return true;
        }
        if (viewerRole === 'ADMIN') {
            return true;
        }
        if (viewerRole === 'SELLER' && this.sellerId === viewerId) {
            return true;
        }
        return false;
    }
    getMaxPurchaseLimit(): number {
        return this.maxPurchaseLimit || 10;
    }
    changeMaxPurchaseLimit(limit: number): void {
        this.maxPurchaseLimit = limit;
        this.touch();
    }
    public ensureCanBeModifiedBy(userId: string, userRole: string): void {
        if (userRole === 'ADMIN') return;
        if (userRole === 'SELLER' && this.sellerId === userId) return;
        throw new ForbiddenException ();
    }
    //helper
    private touch(): void {
        this.updatedAt = new Date();
    }

    //gets for mapper
    getId(): ProductId { return this.id; }
    getTitle(): Title { return this.title; }
    getDescription(): string { return this.description; }
    getSellerId():string{return this.sellerId}
    getPrice(): Price { return this.price; }
    getStock(): Stock { return this.stock; }
    getStatus(): ProductStatus { return this.status; }
    getCategory():string{return this.categoryId}
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date | undefined { return this.updatedAt; }
}
export { Product }