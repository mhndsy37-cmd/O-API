import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { IOrderRepository } from '../../Domain/Repositories/Order.repository.interface.js';
import { IProductRepository } from '../../../Product/Domain/Repositories/Product.repository.interface.js';
import { ICartRepository } from '../../../Cart/Domain/Repositories/Cart.repository.interface.js';
import { IUserRepository } from '../../../User/Domain/Repositories/User.repository.interface.js'; // add

import { Order } from '../../Domain/Entities/Order.entity.js';
import { OrderItem } from '../../Domain/ValueObjects/OrderItem.vo.js';
import { OrderStatus } from '../../Domain/Enums/OrderStatus.enum.js';
import { ProductId } from '../../../Product/Domain/ValueObjects/ProductId.vo.js';
import { UserId } from '../../../User/Domain/ValueObjects/UserId.vo.js'; // add

import { PaymentGateway } from '../../../Payment/Domain/Enums/PaymentGateway.enum.js';
import { PaymentService } from '../../../Payment/Application/Services/Payment.service.js';
import { PaymentSucceededEvent } from '../../../Payment/Domain/Events/PaymentSucceeded.event.js';
import { ProductReduceStock } from '../../../Product/Domain/Enums/ProductReduceStock.enum.js';
import { OrderStatusChangedEvent } from '../../Domain/Events/OrderStatusChanged.event.js';
import { OrderPaidEvent } from '../../Domain/Events/OrderPaid.event.js'; // make this event

@Injectable()
class OrderService {
    constructor(
        @Inject('IOrderRepository')
        private readonly orderRepository: IOrderRepository,
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        @Inject('ICartRepository')
        private readonly cartRepository: ICartRepository,
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository, // inject
        private readonly paymentService: PaymentService,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    // checkout
    async checkout(userId: string): Promise<Order> {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart || cart.getItems().length === 0) {
            throw new BadRequestException('Cart is Empty.');
        }

        const orderItems: OrderItem[] = [];
        for (const cartItem of cart.getItems()) {
            const product = await this.productRepository.findById(ProductId.createFromPlain(cartItem.productId));

            if (!product) {
                throw new BadRequestException(`Product with this id ${cartItem.productId} not found.`);
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

    // pay
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

    // payment
    @OnEvent('PaymentSucceededEvent')
    async handlePaymentSucceeded(event: PaymentSucceededEvent): Promise<void> {
        const order = await this.orderRepository.findById(event.orderId);
        if (!order) return;

        order.markAsPaid();
        await this.orderRepository.save(order);

        for (const item of order.getItems()) {
            const product = await this.productRepository.findById(ProductId.createFromPlain(item.productId));
            if (product) {
                product.reduceStock(item.quantity, ProductReduceStock.PURCHASE);
                await this.productRepository.save(product);
            }
        }

        // fetch user
        const user = await this.userRepository.findById(UserId.createFromPlain(order.getUserId()));

        // emit order paid
        this.eventEmitter.emit(
            'OrderPaidEvent',
            new OrderPaidEvent(
                order.getStringId(),
                event.refId,
                order.getTotalPrice(),
                user?.getEmail()?.getValue() ?? null,
                user?.getPhonenumber().getValue() ?? ''
            )
        );
    }

    // status
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

        await this.orderRepository.save(order); // remove duplicate

        // fetch user
        const user = await this.userRepository.findById(UserId.createFromPlain(order.getUserId()));

        // emit event
        this.eventEmitter.emit(
            'OrderStatusChangedEvent',
            new OrderStatusChangedEvent(
                order.getStringId(),
                order.getStatus(),
                user?.getEmail()?.getValue() ?? null,
                user?.getPhonenumber().getValue() ?? ''
            )
        );

        return order;
    }

    // my orders
    async getMyOrders(userId: string): Promise<Order[]> {
        return this.orderRepository.findByUserId(userId);
    }
}
export { OrderService }