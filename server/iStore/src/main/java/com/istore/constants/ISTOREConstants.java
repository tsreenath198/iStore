package com.istore.constants;

public interface ISTOREConstants {
	String GET = "/get";
	String CREATE = "/create";
	String UPDATE = "/update";
	String DELETE = "/delete";
	String RECORD_INVENTORY = "/recordInventory";
	String GET_INVENTORY_METADATA = "/getMetaData";
	String GET_BY_TABLENAME = "recordInventory/getByTableName";

	String PRODUCT = "/product";
	String INVENTORY = "/inventory";
	String BILL = "/bill";
	String CATEGORY = "/category";
	String SALES = "/sales";
	String PROFIT = "/profit";
	String REPORT = "/report";
	String ORDER = "/order";
	String SMS = "/sms";
	String SEND = "/send";
	String GET_ALL = "/getAll";
	String GET_TOTAL = "/getTotal";
	String GET_BY_CATEGORY = "/getByCategory";
	String GET_BY_PRODUCT = "/getByProduct";

	String GET_TOTAL_BY_DAYS = "/getTotalByDays";
	String GET_TOTAL_BY_YEARS = "/getTotalByYear";
	String GET_TOTAL_BY_MONTH = "/getTotalByMonth";

	String GET_REPORT_TOTAL_BY_GROUP = "/getReportTotalByGroup";
	String GET_REPORT_TOTAL_BY_VALUE = "/getReportTotalByValue";
	String GET_ALL_RECORDS_BY_DAY = "getAllRecordsByDay";

	String GET_TOTAL_RECORD_COUNT = "/getTotalRecordCount";
	String SET_INVENTORY = "/setInventory";
	String DOWNLOAD_INVENTORY = "/downloadInventory";
	String CURRENT_INVENTORY = "/getCurrentInventory";
	String GROUP_BY = "/groupBy";
	String USER = "/user";
	String CONTACT = "/contact";
	String LOGIN = "/login";
	String VALIDATE_USER = "/validateUser";
	String SEARCH = "/search";
	String EXPENSE = "/expense";

	String SUCCESS = "Successfully";
	String DELETED = "Deleted Successfully";
	String FAILED = "Operation Failed";
}
