package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.OrderDetail;

@Service
public interface OrderDetailService {
	public OrderDetail create(OrderDetail entity);

	public OrderDetail update(OrderDetail entity);

	public GenericResponse delete(Integer id);

	public List<OrderDetail> getAll();

	public OrderDetail get(Integer id);
}
