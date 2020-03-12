package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.iStore.iStore.model.CategoryDetailInterface;
import com.iStore.iStore.model.Sales;

public interface SalesService {

	Map<Date, List<Sales>> getSalesByDate(int days) throws ParseException;

	List<CategoryDetailInterface> getSalesByCategory(String fromDate, String toDate) throws ParseException;

}
