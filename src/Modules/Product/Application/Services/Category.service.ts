import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../Domain/Repositories/Category.repository.interface.js';
import { Category } from '../../Domain/Entities/Category.entity.js';
import { CreateCategoryDto } from '../Dtos/CreateCategory.dto.js';

@Injectable()
class CategoryService {
    constructor(
        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,
    ) { }
    async createCategory(dto: CreateCategoryDto): Promise<Category> {
        const existingCategory = await this.categoryRepository.findBySlug(dto.slug);
        if (existingCategory) {
            throw new ConflictException('A category with this slug already exists.');
        }
        if (dto.parentId) {
            const parent = await this.categoryRepository.findById(dto.parentId);
            if (!parent) {
                throw new ConflictException('Parent category not found.');
            }
        }

        const category = Category.create(
            dto.name,
            dto.slug,
            dto.parentId,
            dto.description
        );

        await this.categoryRepository.save(category);
        return category;
    }
    async getAllCategories(): Promise<any[]> {
        const categories = await this.categoryRepository.findAll();
        const categoryMap = new Map<string, any>();
        const roots: any[] = [];
        categories.forEach(cat => {
            categoryMap.set(cat.getId(), {
                id: cat.getId(),
                name: cat.getName(),
                slug: cat.getSlug(),
                parentId: cat.getParentId(),
                description: cat.getDescription(),
                children: []
            });
        });
        categories.forEach(cat => {
            const mappedCat = categoryMap.get(cat.getId());
            if (cat.getParentId()) {
                const parent = categoryMap.get(cat.getParentId()??"");
                if (parent) {
                    parent.children.push(mappedCat);
                }
            } else {
                roots.push(mappedCat);
            }
        });

        return roots;
    }
}
export{CategoryService}