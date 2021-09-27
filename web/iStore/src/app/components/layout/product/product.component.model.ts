import { pid } from 'process';
import { CategoryModel } from '../category/category.component.model';

export class ProductModel {
  id: number;
  name: string;
  price: number;
  description: string;
  category: CategoryModel;
  activeStatus: any;
  defaultDiscount: number;
  landingPrice: number;
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