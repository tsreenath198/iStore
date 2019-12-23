export interface ItemModel{
    id: number;
    productId: number;
    quantity: number;
    discount: number;
    price: number;
    total: number;
    description: string;
    orderId: number;
}

export interface OrderModel{
    id: number;
    total:number;
    items: Array<ItemModel>;
}