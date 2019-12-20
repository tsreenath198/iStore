package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Order;

@Service
public interface OrderService {
	public Order create(Order entity);

	public Order update(Order entity);

	public GenericResponse delete(Integer id);

	public List<Order> getAll();

	public Order get(Integer id);
}
