import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../../Domain/Enums/OrderStatus.enum.js';

class UpdateOrderStatusDto {
    @IsEnum(OrderStatus, { message:'The submitted status is not valid.' })
    @IsNotEmpty()
    status!: OrderStatus;
}
export{UpdateOrderStatusDto}