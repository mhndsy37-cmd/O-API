import { ProductStatus } from '../Enums/ProductStatus.enum.js';

interface CreateProductProps {
    title: string;
    description: string;
    sellerId:string;
    price: number;
    stock: number;
    images:string[]
    categoryId: string;
}

interface RestoreProductProps {
    id: string;
    title: string;
    description: string;
    sellerId:string
    price: number;
    stock: number;
    images?:string[]
    status: ProductStatus;
    categoryId: string
    createdAt: Date;
    updatedAt?: Date;
}
export type{CreateProductProps,RestoreProductProps}