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
}