import { CategoryModel } from '../category/category.component.model';

export class ProductModel {
  id: number;
  name: string;
  price: number;
  description: string;
  image: FormData;
  inventory: number;
  category: CategoryModel;
  productOrder: number ;
  minimumAvailability: number;
  activeStatus: any;
  defaultDiscount: number;
  unitPrice:number;
}

export class ProductsOrderModel{
  productName: string;
  minAvailability: number;
  inventory: number;
  orderCount: number;
}
export class OrderModel{
  categoryName: string;
  products: Array<ProductsOrderModel>;
}