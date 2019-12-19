export interface BillModel{
    id: number;
    productId: number;
    quantity: number;
    discount: number;
    price: number;
    total: number;
    description: string;
}