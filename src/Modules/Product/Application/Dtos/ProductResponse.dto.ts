import { ProductStatus } from '../../Domain/Enums/ProductStatus.enum.js';

class ProductResponseDto {
    id!: string;
    title!: string;
    description!: string;
    sellerName!: string;
    sellerId!:string;
    price!: number;
    stock!: number;
    maxPurchaseLimit!:number
    images!:string[]
    status!: ProductStatus;
    createdAt!: Date;
    updatedAt?: Date;
}
export{ProductResponseDto}