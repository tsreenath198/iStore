import { pid } from 'process';
import { CategoryModel } from '../category/category.component.model';

export class ProductModel {
  id: number;
  name: string;
  price: number;
  description: string;
  image: FormData;
  inventory: number;
  category: CategoryModel;
  productOrder: number;
  minimumAvailability: number;
  activeStatus: any;
  defaultDiscount: number;
  landingPrice: number;
  adhocPrice:number;
  requiredInventories: Array<RequiredInventories>;
}

export class RequiredInventories {
  productInventoryId: ProductInventory;
  unitsRequired: number;
}

export class ProductInventory {
  inventoryId: number;
  productId: number;
}

export class ProductsOrderModel {
  productName: string;
  minAvailability: number;
  inventory: number;
  orderCount: number;
}
export class OrderModel {
  categoryName: string;
  products: Array<ProductsOrderModel>;
}