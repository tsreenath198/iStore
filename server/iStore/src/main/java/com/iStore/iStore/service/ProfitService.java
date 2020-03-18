package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.iStore.iStore.model.CategoryDetailInterface;
import com.iStore.iStore.model.ProfitInterface;
import com.iStore.iStore.model.Sales;

public interface ProfitService {

	Map<Date, List<Sales>> getProfitByDate(int days) throws ParseException;

	List<ProfitInterface> getProfitByCategory(String fromDate, String toDate) throws ParseException;

	List<CategoryDetailInterface> getProductByProduct(String category, String fromDate, String toDate);

}
