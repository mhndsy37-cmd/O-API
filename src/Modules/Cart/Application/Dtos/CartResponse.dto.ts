class CartItemResponseDto {
    productId!: string;
    title!: string;
    price!: number;
    image?: string | undefined;
    quantity!: number;
    totalPrice!: number;
}
class CartResponseDto {
    cartId!: string;
    userId!: string;
    items!: CartItemResponseDto[];
    totalPrice!: number;
}
export { CartItemResponseDto, CartResponseDto }