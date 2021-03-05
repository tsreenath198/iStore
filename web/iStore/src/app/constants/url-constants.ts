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

  /**Reporr */

  ReportByGroup='report/getReportTotalByGroup?fromDate='
  ReportByValue = 'report/getReportTotalByValue?value='
  ReportGetBills = 'report/getAllRecordsByDay?month='

  
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


  /** Expense */
  ExpenseCreate = 'expense/create';
  ExpenseGetAll = 'expense/getAll';
  ExpenseUpdate = 'expense/update';
  ExpenseDelete = 'expense/delete?id=';
  ExpenseGetById = 'expense/get?id=';


  /**Customers */
  CustomerCreate = 'contact/create';
  CustomerGetAll = 'contact/getAll';
  CustomerUpdate = 'contact/update';
  CustomerDelete = 'contact/delete?id=';
  CustomerGetById = 'contact/get?id=';

  /**Inventory */
  InventoryCreate = 'inventory/create';
  InventoryGetAll = 'inventory/getAll';
  InventoryUpdate = 'inventory/update';
  InventoryDelete = 'inventory/delete?id=';
  InventoryGetById = 'inventory/get?id=';

  InventoryBackup = 'inventory/backup';
  GetRecordInventory = 'inventory/recordInventory/getByTableName?tableName=';
  InventoryMetaData = 'inventory/getMetaData';

  /** Profit */
  ProfitGetCategory = 'profit/getByCategory?fromDate=';
  ProfitGetProduct = 'profit/getByProduct?category=';

  /** Login */
  Login = 'login/validateUser?name=';
  /**Sales */
  SalesGetCategories = 'sales/getByCategory?fromDate=';
  SalesGetProducts = 'sales/getByProduct?category=';

}