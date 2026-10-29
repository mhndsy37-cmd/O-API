import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from '../../Domain/Repositories/Order.repository.interface.js';
import { IProductRepository } from '../../../Product/Domain/Repositories/Product.repository.interface.js';
import { ICartRepository } from '../../../Cart/Domain/Repositories/Cart.repository.interface.js';
import { Order } from '../../Domain/Entities/Order.entity.js';
import { OrderItem } from '../../Domain/ValueObjects/OrderItem.vo.js';
import { ProductId } from '../../../Product/Domain/ValueObjects/ProductId.vo.js';
import { PaymentGateway } from '../../../Payment/Domain/Enums/PaymentGateway.enum.js';
import { PaymentService } from '../../../Payment/Application/Services/Payment.service.js';
import { OrderStatus } from '../../Domain/Enums/OrderStatus.enum.js';

@Injectable()
class OrderService {
    constructor(
        @Inject('IOrderRepository')
        private readonly orderRepository: IOrderRepository,
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        @Inject('ICartRepository')
        private readonly cartRepository: ICartRepository,
        private readonly paymentService: PaymentService,
    ) { }
    async checkout(userId: string): Promise<Order> {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart || cart.getItems().length === 0) {
            throw new BadRequestException('Cart is Empty.');
        }

        const orderItems: OrderItem[] = [];
        for (const cartItem of cart.getItems()) {
            const product = await this.productRepository.findById(ProductId.createFromPlain(cartItem.productId));

            if (!product) {
                throw new BadRequestException(`Product with this id${cartItem.productId} not founded.`);
            }

            if (!product.isAvailableForPurchase()) {
                throw new BadRequestException(`Product "${product.getTitle().getValue()}" not Available for Purchase.`);
            }

            if (product.getStock().getValue() < cartItem.getQuantity()) {
                throw new BadRequestException(`The stock for "${product.getTitle().getValue()}" product is insufficient.`);
            }
            orderItems.push(OrderItem.create(
                cartItem.productId,
                product.getTitle().getValue(),
                product.getPrice().getValue(),
                cartItem.getQuantity()
            ));
        }
        const order = Order.create(userId, orderItems);
        await this.orderRepository.save(order);
        cart.clearCart();
        await this.cartRepository.save(cart);

        return order;
    }
    async payOrder(orderId: string, userId: string): Promise<{ redirectUrl: string }> {
        const order = await this.orderRepository.findById(orderId);

        if (!order) throw new NotFoundException('order not found.');
        if (order.getUserId() !== userId) throw new ForbiddenException('You do not have access to this order.');
        if (order.getStatus() !== OrderStatus.PENDING) {
            throw new BadRequestException('This order is not in a status that allows for payment.');
        }
        const paymentResult = await this.paymentService.initiatePayment({
            amount: order.getTotalPrice(),
            gateway: PaymentGateway.ZARINPAL,
            orderId: order.getStringId(),
        });
        order.setPaymentAuthority(paymentResult.authority);
        await this.orderRepository.save(order);

        return { redirectUrl: paymentResult.redirectUrl };
    }
    async changeOrderStatus(
        orderId: string,
        newStatus: OrderStatus,
        userRole: string
    ): Promise<Order> {
        if (userRole !== 'ADMIN' && userRole !== 'SELLER') {
            throw new ForbiddenException('You do not have permission to change the order status.');
        }

        const order = await this.orderRepository.findById(orderId);
        if (!order) throw new NotFoundException('Order not found.');
        switch (newStatus) {
            case OrderStatus.PROCESSING:
                order.markAsProcessing();
                break;
            case OrderStatus.SHIPPED:
                order.markAsShipped();
                break;
            case OrderStatus.DELIVERED:
                order.markAsDelivered();
                break;
            case OrderStatus.CANCELED:
                order.cancel();
                break;
            default:
                throw new BadRequestException('The status is invalid.');
        }

        await this.orderRepository.save(order);
        return order;
    }
    async getMyOrders(userId: string): Promise<Order[]> {
        return this.orderRepository.findByUserId(userId);
    }
}
export { OrderService }