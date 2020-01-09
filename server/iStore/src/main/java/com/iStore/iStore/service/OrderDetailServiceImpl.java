package com.iStore.iStore.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Item;
import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.repository.OrderDetailRepository;
import com.iStore.iStore.util.DateHelper;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
	@Autowired
	OrderDetailRepository orderRepository;
	@Autowired
	ProductServiceImpl productService;

	@Override
	public OrderDetail create(OrderDetail entity) {
		try {
			productService.updateInventory(entity.getItems());
			List<Item> list = entity.getItems();
			for (Item i : list) {
				i.setProduct(productService.get(i.getProduct().getId()));
			}
			entity.setItems(list);
			return orderRepository.save(entity);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public OrderDetail update(OrderDetail entity) {
		try {
			OrderDetail order = get(entity.getId());
			order.setTotal(entity.getTotal());
			return orderRepository.save(order);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
		try {
			OrderDetail p = get(id);
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
	public List<OrderDetail> getAll() {
		return (List<OrderDetail>) orderRepository.findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(0);
	}

	@Override
	public OrderDetail get(Integer id) {
		Optional<OrderDetail> order = null;
		try {
			order = orderRepository.findByIdAndActiveFlag(id, 0);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (order.isPresent())
			return order.get();
		else
			throw new ValidationException("Record not found with the id " + id);
	}

	@Override
	public float getTotalByDate(String from, String to) throws ParseException {
		float total;
		if (from != null && to != null) {
			Date dtFrom = DateHelper.convertStringToDate(from);
			Date dtto = DateHelper.convertStringToDate(to);
			total = getBetweenDates(dtFrom, dtto);
		} else
			total = getCurrentDayTotal(new Date());
		return total;
	}

	private float getBetweenDates(Date from, Date to) {
		Date toDate = DateHelper.addOneDay(to);
		List<OrderDetail> ot = orderRepository.findAllBetweenDates(from, toDate);
		return getTotal(ot);
	}

	private float getCurrentDayTotal(Date date) {
		List<OrderDetail> ot = orderRepository.findAllByCreatedDate(date);
		return getTotal(ot);
	}

	private float getTotal(List<OrderDetail> ot) {
		float ct = 0.0f;
		for (OrderDetail t : ot) {
			ct += t.getTotal();
		}
		return ct;
	}
}
