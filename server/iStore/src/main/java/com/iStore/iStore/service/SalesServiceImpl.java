package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.PaymentMode;
import com.iStore.iStore.model.Category;
import com.iStore.iStore.model.Item;
import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.model.OrderDetails;
import com.iStore.iStore.model.Sales;
import com.iStore.iStore.repository.CategoryRepository;
import com.iStore.iStore.repository.OrderDetailRepository;
import com.iStore.iStore.util.DateHelper;
import com.iStore.iStore.util.UniqueDatesHelper;

@Service
public class SalesServiceImpl implements SalesService {

	@Autowired
	OrderDetailRepository orderRepository;
	@Autowired
	CategoryRepository categoryRepository;

	@Override
	public Map<Date, List<Sales>> getSalesByDate(int days) throws ParseException {

		List<OrderDetail> orders = orderRepository.findAllByDays(days);
		return calculateSales(orders);
	}

	private Map<Date, List<Sales>> calculateSales(List<OrderDetail> orders) throws ParseException {
		Map<Date, List<Sales>> salesMap = new HashMap<Date, List<Sales>>();
		Set<Date> uniqueDates = UniqueDatesHelper.uniqueDatesWithoutTime(orders);
		List<Category> categories = getAllCategories();
		List<Sales> sales = new ArrayList<Sales>();
		for (Date dt : uniqueDates) {
			sales = new ArrayList<Sales>();
			for (Category category : categories) {
				float cashTotal = 0;
				float bankTotal = 0;
				Sales sale = new Sales();
				ArrayList<Sales> sales1 = new ArrayList<Sales>();
				for (OrderDetail order : orders) {
					if (dt.equals(DateHelper.convertDateWithouTime(order.getCreatedDate()))) {
						for (Item item : order.getItems()) {
							if (category.getName() == item.getProduct().getCategory().getName()) {
								if (order.getPaymentMode() != null && order.getPaymentMode() == PaymentMode.Cash) {
									cashTotal += item.getTotal();
								}
								if (order.getPaymentMode() != null && order.getPaymentMode() == PaymentMode.Bank) {
									bankTotal += item.getTotal();
								}
							}
						}
					}
				}
				sale.setCategory(category.getName());
				sale.setDate(null);
				sale.setBankTotal(bankTotal);
				sale.setCashTotal(cashTotal);
				sales1.add(sale);
				sales.addAll(sales1);
				salesMap.put(dt, sales);
			}
		}

		return salesMap;
	}

	private List<Category> getAllCategories() {
		return categoryRepository.findAllByActiveFlagAllIgnoreCaseOrderByCategoryOrderAsc(0);
	}

	@Override
	public Map<Integer, List<OrderDetails>> getSalesByType(String groupBy, String fromDate, String toDate)
			throws ParseException {
		Map<String, List<Sales>> salesMap = new HashMap<String, List<Sales>>();
		List<Sales> sales = new ArrayList<>();
		List<Category> categories = getAllCategories();
		List<OrderDetails> orders = orderRepository.getSalesByType(fromDate, toDate);
		System.out.println("Size::" + orders.size());
		Set<Integer> months = new HashSet<>();
		for (Category category : categories) {
		}

		for (OrderDetails order : orders) {
			System.out.println("month---" + order.getMonth() + "--" + order.getCreatedDate().getMonth() + 1);
			months.add(order.getMonth());
		}
		Map<Integer, List<OrderDetails>> m = new HashMap<Integer, List<OrderDetails>>();
		for (OrderDetails orderDetails : orders) {
			for (Integer month : months) {
				if (month.equals(orderDetails.getCreatedDate().getMonth() + 1))
					m.put(month, orders);
			}
		}
		return m;
	}

}
