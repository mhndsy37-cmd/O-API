import { Body, Controller, Get, Post, UseGuards, Inject } from '@nestjs/common';
import { CategoryService } from '../Services/Category.service.js';
import { CreateCategoryDto } from '../Dtos/CreateCategory.dto.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';
import { RolesGuard } from '../../../../Shared/Guards/Roles.guard.js';
import { Roles } from '../../../../Shared/Decorators/Roles.decorator.js';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';

@Controller('categories')
export class CategoryController {
    constructor(
        @Inject(CategoryService) private readonly categoryService: CategoryService
    ) {}
    @Get()
    async getAll() {
        return this.categoryService.getAllCategories();
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.createCategory(dto);
    }
}