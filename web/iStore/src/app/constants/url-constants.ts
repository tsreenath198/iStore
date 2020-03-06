export class URLConstants {
  /*product*/
  ProductCreate = 'product/create';
  ProductGetAll = 'product/getAll';
  ProductUpdate = 'product/update';
  ProductDelete = 'product/delete?id=';
  ProductGetById = 'product/get?id=';
  ProductGetInventory = 'product/getCurrentInventory';
  ProductInventoryUpdate = 'product/setInventory';
  GetRawInventory = 'product/downloadInventory';
 
  /**Order */
  OrderCreate = 'order/create';
  OrderGetAll = 'order/getAll';
  OrderUpdate = 'order/update';
  OrderDelete = 'order/delete?id=';
  OrderGetById = 'order/get?id=';
  OrderTotalByDays = 'order/getTotalByDays?days='
  OrderGetId = 'order/getTotalRecordCount'

  /**Category */
  CategoryCreate = 'category/create';
  CategoryGetAll = 'category/getAll';
  CategoryUpdate = 'category/update';
  CategoryDelete = 'category/delete?id=';
  CategoryGetById = 'category/get?id=';

  /** User */
  UserCreate = 'user/create';
  UserGetAll = 'user/getAll';
  UserUpdate = 'user/update';
  UserDelete = 'user/delete?id=';
  UserGetById = 'user/get?id=';

  /** Login */
  Login = 'login/validateUser?name=';
  /**Sales */
  SalesTotal = 'sales/getTotal?days='
}