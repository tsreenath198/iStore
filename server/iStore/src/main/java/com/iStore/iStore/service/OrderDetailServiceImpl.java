package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.constants.PaymentMode;
import com.iStore.iStore.model.Contact;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Item;
import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.model.OrderTotal;
import com.iStore.iStore.repository.ItemRepository;
import com.iStore.iStore.repository.OrderDetailRepository;
import com.iStore.iStore.util.DateHelper;
import com.iStore.iStore.util.RegexValidator;
import com.iStore.iStore.util.UniqueDatesHelper;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
	@Autowired
	OrderDetailRepository orderRepository;
	@Autowired
	ProductServiceImpl productService;
	@Autowired
	ItemRepository itemRepository;

	@Override
	public OrderDetail create(OrderDetail entity) {
		try {
			Contact contact = entity.getContact();
			if (contact.getName() != null) {
				if (!RegexValidator.isValidName(contact.getName().trim())) {
					throw new ValidationException("please enter valid name");
				}
			}

			if (contact.getPhone() != null) {
				if (!RegexValidator.isValidPhoneNumber(contact.getPhone().trim())) {
					throw new ValidationException("please enter valid phone number");
				}
			}

			productService.deleteInventory(entity.getItems());
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
			itemRepository.saveAll(entity.getItems());
			return orderRepository.save(entity);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
		try {
			OrderDetail od = get(id);
			productService.addInventory(od.getItems());
			od.setActiveFlag(1);
			update(od);
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
			OrderTotal t = getBetweenDatesTotal(dtFrom, dtto);
			total = t.getTotal();
		} else {
			OrderTotal t = getCurrentDayTotal(new Date());
			total = t.getTotal();
		}

		return total;
	}

	@Override
	public Integer getTotalRecordsCount() {
		return orderRepository.getTotalRecordsCount();
	}

	@Override
	public List<OrderTotal> getTotalByDays(int days) throws ParseException {
		List<OrderDetail> orders = orderRepository.findAllByDays(days);
		List<OrderTotal> otList = new ArrayList<OrderTotal>();
		OrderTotal otMap = null;
		Set<Date> unique = UniqueDatesHelper.uniqueDatesWithoutTime(orders);
		for (Date dt : unique) {
			otMap = new OrderTotal();
			otMap.setDate(dt);
			OrderTotal total = getCurrentDayTotal(dt);
			otMap.setTotal(total.getTotal());
			otMap.setBankTotal(total.getBankTotal());
			otMap.setCashTotal(total.getCashTotal());
			otList.add(otMap);
		}
		return otList;
	}

	private OrderTotal getBetweenDatesTotal(Date from, Date to) {
		Date toDate = DateHelper.addOneDay(to);
		List<OrderDetail> ot = orderRepository.findAllBetweenDates(from, toDate);
		return getTotal(ot);
	}

	private OrderTotal getCurrentDayTotal(Date date) {
		List<OrderDetail> ot = new ArrayList<OrderDetail>();
		String strDate = DateHelper.convertDateToString(date);
		ot = orderRepository.findAllByCreatedDate(strDate);
		return getTotal(ot);
	}

	private OrderTotal getTotal(List<OrderDetail> ot) {
		float ct = 0.0f;
		float casht = 0.0f;
		float bankt = 0.0f;
		OrderTotal ordert = new OrderTotal();
		for (OrderDetail t : ot) {
			if (t.getPaymentMode() != null && t.getPaymentMode() == PaymentMode.Cash) {
				casht += t.getTotal();
				ordert.setCashTotal(casht);
			}
			if (t.getPaymentMode() != null && t.getPaymentMode() == PaymentMode.Bank) {
				bankt += t.getTotal();
				ordert.setBankTotal(bankt);
			}
			ct += t.getTotal();
			ordert.setTotal(ct);
		}
		return ordert;
	}

}
