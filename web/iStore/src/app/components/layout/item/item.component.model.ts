export interface ItemModel{
    id: number;
    productId: number;
    quantity: number;
    discount: number;
    price: number;
    total: number;
    description: string;
    orderId: number;
    name: string;
    phone: number;
}

export interface OrderModel{
    invoiceDate: Date;
    orderType:string;
    id: number;
    total:number;
    paymentMode:string;
    items: Array<ItemModel>;
    contact: ContactModel;
    totalDiscount: number;
}

export interface ContactModel{
    name: string;
    phone: string;
}