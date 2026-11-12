import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../Domain/Enums/OrderStatus.enum.js';

class OrderResponseDto {
    // prop
    @ApiProperty({ description: 'Order ID', example: '60d5ecb8b392d7001f3f8a12' })
    id!: string;

    // prop
    @ApiProperty({ description: 'Total price', example: 250000 })
    totalPrice!: number;

    // prop
    @ApiProperty({ description: 'Order status', example: OrderStatus.PENDING ,enum:OrderStatus })
    status!: string;

    // prop
    @ApiProperty({ description: 'Created at', example: '2026-11-11T20:37:46.578Z' })
    createdAt!: Date;
}
export { OrderResponseDto }