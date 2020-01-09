package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.model.OrderTotal;

@Service
public interface OrderDetailService {
	public OrderDetail create(OrderDetail entity);

	public OrderDetail update(OrderDetail entity);

	public GenericResponse delete(Integer id);

	public List<OrderDetail> getAll();

	public OrderDetail get(Integer id);

	public float getTotalByDate(String from, String to) throws ParseException;
	
	public List<OrderTotal> getTotalByDays(int days) throws ParseException;
}
