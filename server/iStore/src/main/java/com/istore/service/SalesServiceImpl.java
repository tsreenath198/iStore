package com.istore.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.istore.constants.PaymentMode;
import com.istore.repository.CategoryRepository;
import com.istore.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.istore.model.Category;
import com.istore.model.CategoryDetailInterface;
import com.istore.model.Item;
import com.istore.model.OrderDetail;
import com.istore.model.Sales;
import com.istore.util.DateHelper;
import com.istore.util.UniqueDatesHelper;

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
		Map<Date, List<Sales>> salesMap = new HashMap<>();
		Set<Date> uniqueDates = UniqueDatesHelper.uniqueDatesWithoutTime(orders);
		List<Category> categories = getAllCategories();
		List<Sales> sales;
		for (Date dt : uniqueDates) {
			sales = new ArrayList<>();
			for (Category category : categories) {
				float cashTotal = 0;
				float bankTotal = 0;
				Sales sale = new Sales();
				ArrayList<Sales> sales1 = new ArrayList<>();
				for (OrderDetail order : orders) {
					if (dt.equals(DateHelper.convertDateWithouTime(order.getCreatedDate()))) {
						for (Item item : order.getItems()) {
							if (category.getName().equalsIgnoreCase(item.getProduct().getCategory().getName())) {
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
	public List<CategoryDetailInterface> getSalesByCategory(String fromDate, String toDate) {
		String uptoDate = DateHelper.getNextDay(toDate);
		return orderRepository.getSalesByCategory(fromDate, uptoDate);
	}

	@Override
	public List<CategoryDetailInterface> getProductByProduct(String category, String fromDate, String toDate) {
		String uptoDate = DateHelper.getNextDay(toDate);
		return orderRepository.getProductByProduct(category, fromDate, uptoDate);
	}

}
