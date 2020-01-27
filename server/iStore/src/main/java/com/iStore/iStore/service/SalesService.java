package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.iStore.iStore.model.Sales;

public interface SalesService {

	Map<String, List<Sales>> getSalesByDate(int days) throws ParseException;

}
