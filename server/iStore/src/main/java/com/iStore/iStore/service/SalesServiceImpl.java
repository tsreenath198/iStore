package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.PaymentMode;
import com.iStore.iStore.model.Category;
import com.iStore.iStore.model.Item;
import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.model.Sales;
import com.iStore.iStore.repository.CategoryRepository;
import com.iStore.iStore.repository.OrderDetailRepository;
import com.iStore.iStore.util.DateHelper;

@Service
public class SalesServiceImpl implements SalesService {

	@Autowired
	OrderDetailRepository orderRepository;
	@Autowired
	CategoryRepository categoryRepository;

	@Override
	public List<Sales> getSalesByDate(String dt) throws ParseException {
		Date strDate = DateHelper.convertStringToDate(dt);
		Date dateWithoutTime = DateHelper.convertDateWithouTime(strDate);
		List<OrderDetail> ot = orderRepository.findAllOnDate(dateWithoutTime);
		return calculateSales(ot, dt);
	}

	private List<Sales> calculateSales(List<OrderDetail> orders, String dt) {
		List<Category> categories = getAllCategories();
		List<Sales> sales = new ArrayList<Sales>();
		for (Category category : categories) {
			float cashTotal = 0;
			float bankTotal = 0;
			Sales sale = new Sales();
			for (OrderDetail order : orders) {
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
			sale.setCategory(category.getName());
			sale.setDate(dt);
			sale.setBankTotal(bankTotal);
			sale.setCashTotal(cashTotal);
			sales.add(sale);
		}
		return sales;
	}

	private List<Category> getAllCategories() {
		return categoryRepository.findAllByActiveFlagAllIgnoreCaseOrderByCategoryOrderAsc(0);
	}

}
