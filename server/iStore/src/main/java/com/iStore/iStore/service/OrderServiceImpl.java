package com.iStore.iStore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Order;
import com.iStore.iStore.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	OrderRepository repository;

	@Override
	public Order create(Order entity) {
		try {
			return repository.save(entity);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public Order update(Order entity) {
		try {
			Order order = get(entity.getId());
			order.setTotal(entity.getTotal());
			return repository.save(order);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
		try {
			Order p = get(id);
			p.setActiveFlag(1);
			update(p);
			resp = new GenericResponse();
			resp.setMessage(id + " " + ISTOREConstants.DELETED);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return resp;
	}

	@Override
	public List<Order> getAll() {
		return (List<Order>) repository.findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(0);
	}

	@Override
	public Order get(Integer id) {
		Optional<Order> order = null;
		try {
			order = repository.findByIdAndActiveFlag(id, 0);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (order.isPresent())
			return order.get();
		else
			throw new ValidationException("Record not found with the id " + id);
	}

}
