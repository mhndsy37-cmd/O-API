import { Body, Controller, Get, Post, UseGuards, Inject, Patch, Param } from '@nestjs/common';
import { OrderService } from '../Services/Order.service.js';
import { CheckoutDto } from '../Dtos/Checkout.dto.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';
import { GetUser } from '../../../../Shared/Decorators/GetUser.decorator.js';
import { Roles } from '../../../../Shared/Decorators/Roles.decorator.js';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';
import { RolesGuard } from '../../../../Shared/Guards/Roles.guard.js';
import { UpdateOrderStatusDto } from '../Dtos/UpdateOrderStatus.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('orders')
class OrderController {
    constructor(
        @Inject(OrderService) private readonly orderService: OrderService
    ) { }
    @Post('checkout')
    async checkout(@GetUser('sub') userId: string, @Body() _dto: CheckoutDto) {
        return this.orderService.checkout(userId);
    }
    @Get('my-orders')
    async getMyOrders(@GetUser('sub') userId: string) {
        return this.orderService.getMyOrders(userId);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    @Patch(':id/status')
    async changeStatus(
        @Param('id') id: string,
        @Body() dto: UpdateOrderStatusDto,
        @GetUser('role') userRole: string,
    ) {
        return this.orderService.changeOrderStatus(id, dto.status, userRole);
    }
}
export { OrderController }