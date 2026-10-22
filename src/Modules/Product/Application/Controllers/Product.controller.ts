import { Body, Controller, Post, UseGuards, Inject, Query, Get, Param, Patch, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ProductService } from '../Services/Product.service.js';
import { CreateProductDto } from '../Dtos/ProductCreate.dto.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';
import { RolesGuard } from '../../../../Shared/Guards/Roles.guard.js';
import { Roles } from '../../../../Shared/Decorators/Roles.decorator.js';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';
import { UpdateProductDto } from '../Dtos/UpdateProduct.dto.js';
import { GetUser } from '../../../../Shared/Decorators/GetUser.decorator.js';
import { RestockProductDto } from '../Dtos/RestockProduct.dto.js';
import { OptionalJwtAuthGuard } from '../../../../Shared/Guards/OptionalJwtAuth.guard.js';
import { log } from 'console';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
class ProductController {
    constructor(
        @Inject(ProductService) private readonly productService: ProductService
    ) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    @Post()
    async createProduct(@Body() dto: CreateProductDto, @GetUser('sub') userId: string,) {
        return this.productService.createProduct(dto, userId);
    }
    @UseGuards(OptionalJwtAuthGuard)
    @Get()
    async getAllProducts(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('search') search?: string,
        @Query('status') status?: string,
        @GetUser() user?: any,
    ) {
        return this.productService.getAllProducts({ page, limit, search, status }, user);
    }
    @UseGuards(OptionalJwtAuthGuard)
    @Get(':id')
    async getProductById(
        @Param('id') id: string,
        @GetUser() user?: any,
    ) {
        log("dd")
        return this.productService.getProductById(id, user);

    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    @Patch(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body() dto: UpdateProductDto,
        @GetUser('sub') userId: string,
        @GetUser('role') userRole: string,
    ) {
        return this.productService.updateProduct(id, dto, userId, userRole);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    @Patch(':id/publish')
    async publishProduct(
        @Param('id') id: string,
        @GetUser('sub') userId: string,
        @GetUser('role') userRole: string,
    ) {
        return this.productService.publishProduct(id, userId, userRole);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    @Patch(':id/restock')
    async restockProduct(
        @Param('id') id: string, @Body() dto: RestockProductDto,
        @GetUser('sub') userId: string,
        @GetUser('role') userRole: string,
    ) {
        return this.productService.restockProduct(id, dto, userId, userRole);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    @Patch(':id/archive')
    async archiveProduct(
        @Param('id') id: string,
        @GetUser('sub') userId: string,
        @GetUser('role') userRole: string,
    ) {
        return this.productService.archiveProduct(id, userId, userRole);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    @Patch(':id/category')
    async changeCategory(
        @Param('id') id: string,
        @Body('categoryId') categoryId: string,
        @GetUser('sub') userId: string,
        @GetUser('role') userRole: string,
    ) {
        return this.productService.changeProductCategory(id, categoryId, userId, userRole);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    @Post(':id/images')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(
        @Param('id') id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
                ],
            }),
        ) file: Express.Multer.File,
        @GetUser('sub') userId: string,
        @GetUser('role') userRole: string,
    ) {
        return this.productService.uploadProductImage(id, file, userId, userRole);
    }

}
export { ProductController }