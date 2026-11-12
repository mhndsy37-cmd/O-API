import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../Domain/Enums/OrderStatus.enum.js';

class UpdateOrderStatusDto {
    // prop
    @ApiProperty({ 
        description: 'Order status for update', 
        enum: OrderStatus, 
        example: OrderStatus.PENDING 
    })
    @IsEnum(OrderStatus, { message: 'The submitted status is not valid.' })
    status!: OrderStatus;
}
export { UpdateOrderStatusDto }