package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.List;

import com.iStore.iStore.model.Sales;

public interface SalesService {

	List<Sales> getSalesByDate(String dt) throws ParseException;


}
