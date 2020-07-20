package com.istore.service;

import java.text.ParseException;
import java.util.List;

import com.istore.model.GenericResponse;
import com.istore.model.OrderDetail;
import com.istore.model.OrderTotal;

public interface OrderDetailService {
	OrderDetail create(OrderDetail entity);

	OrderDetail update(OrderDetail entity);

	GenericResponse delete(Integer id);

	List<OrderDetail> getAll();

	OrderDetail get(Integer id);

	float getTotalByDate(String from, String to) throws ParseException;
	
	List<OrderTotal> getTotalByDays(int days) throws ParseException;

	Integer getTotalRecordsCount();
}
