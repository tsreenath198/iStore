package com.istore.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;
import javax.validation.ValidationException;

import com.istore.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.istore.constants.ISTOREConstants;
import com.istore.constants.PaymentMode;
import com.istore.mapper.ProductInventoryEntityRowMapper;
import com.istore.repository.InventoryRepository;
import com.istore.repository.ItemRepository;
import com.istore.repository.OrderDetailRepository;
import com.istore.util.DateHelper;
import com.istore.util.UniqueDatesHelper;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
	@Autowired
	OrderDetailRepository orderRepository;
	@Autowired
	ProductServiceImpl productService;
	@Autowired
	ItemRepository itemRepository;
	@Autowired
	InventoryRepository inventoryRepository;
	@Autowired
	SMSService smsService;

	@Autowired
	@Qualifier("jdbcTemplate")
	JdbcTemplate jdbcTemplate;

	@Override
	@Transactional
	public OrderDetail create(OrderDetail entity) {
		try {
			List<Item> items = entity.getItems();
			items.forEach(item -> {
				Integer quantity = item.getQuantity();
				List<ProductInventoryEntity> productInventoryEntities = getProductInventoryEntities(
						item.getProduct().getId());

				productInventoryEntities.forEach(productInventoryEntity -> {
					Integer noOfUnits = productInventoryEntity.getUnitsRequired() * quantity;
					Integer inventoryId = productInventoryEntity.getProductInventoryId().getInventoryId();
					inventoryRepository.updateInventory(noOfUnits, inventoryId);
					item.setProduct(productService.get(item.getProduct().getId()));
				});
			});
			entity.setItems(items);
			OrderDetail detail = orderRepository.save(entity);
			if (detail.getContact() != null && detail.getContact().getPhone() != null)
				smsService.sendSMS(detail.getContact().getPhone());
			return detail;
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	private List<ProductInventoryEntity> getProductInventoryEntities(Integer productId) {
		String query = "SELECT * FROM Product_Inventory_Required WHERE product_id = ?";
		List<ProductInventoryEntity> productInventoryEntityList = jdbcTemplate.query(query, new Object[] { productId },
				new ProductInventoryEntityRowMapper());
		return productInventoryEntityList;
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
		GenericResponse resp;
		try {
			OrderDetail od = get(id);
			onDeleteAddInventory(od.getItems());
			orderRepository.deletebyId(id);
			resp = new GenericResponse();
			resp.setMessage(id + " " + ISTOREConstants.DELETED);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return resp;
	}

	private void onDeleteAddInventory(List<Item> items) {
		for (int i = 0; i < items.size(); i++) {
			for (int j = 0; j < items.get(i).getProduct().getRequiredInventories().size(); j++) {
				inventoryRepository.addInventory(items.get(i).getProduct().getRequiredInventories().get(j).getUnitsRequired(),
						items.get(i).getProduct().getRequiredInventories().get(j).getProductInventoryId().getInventoryId());
			}
			System.out.println(i);
		}
		/*items.stream().forEach(item->{
			item.getProduct().getRequiredInventories().stream().forEach(inventory->{
				inventoryRepository.addInventory(inventory.getUnitsRequired(), inventory.getProductInventoryId().getInventoryId());
			});
		});*/
	}

	@Override
	public List<OrderDetail> getAll() {
		return orderRepository.findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(0);
	}

	@Override
	public OrderDetail get(Integer id) {
		Optional<OrderDetail> order;
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
	public float getTotalByDate(String from, String to) {
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
		List<OrderTotal> otList = new ArrayList<>();
		OrderTotal otMap;
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
		String strDate = DateHelper.convertDateToString(date);
		List<OrderDetail> ot = orderRepository.findAllByCreatedDate(strDate);
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
