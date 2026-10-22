import { Category } from '../Entities/Category.entity.js';

export interface ICategoryRepository {
    findById(id: string): Promise<Category | null>;
    findBySlug(slug: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    save(category: Category): Promise<void>;
    delete(id: string): Promise<void>;
}