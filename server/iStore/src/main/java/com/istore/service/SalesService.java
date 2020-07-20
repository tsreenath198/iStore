package com.istore.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.istore.model.CategoryDetailInterface;
import com.istore.model.Sales;

public interface SalesService {

	Map<Date, List<Sales>> getSalesByDate(int days) throws ParseException;

	List<CategoryDetailInterface> getSalesByCategory(String fromDate, String toDate) throws ParseException;

	List<CategoryDetailInterface> getProductByProduct(String category, String fromDate, String toDate);

}
