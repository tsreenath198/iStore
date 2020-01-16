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
import com.iStore.iStore.repository.SalesRepository;
import com.iStore.iStore.util.DateHelper;

@Service
public class SalesServiceImpl implements SalesService {
	@Autowired
	SalesRepository salesRepository;
	@Autowired
	OrderDetailRepository orderRepository;
	@Autowired
	CategoryRepository categoryRepository;

	@Override
	public List<Sales> getSalesByDate(String dt) throws ParseException {
		try {
			List<OrderDetail> ot = new ArrayList<OrderDetail>();
		} catch (Exception e) {
			e.printStackTrace();
		}
		Date strDate = DateHelper.convertStringToDate(dt);
		List<OrderDetail> ot = orderRepository.findAllOnDate(strDate);
		calculateSales(ot);
		return null;
	}

	private List<Sales> calculateSales(List<OrderDetail> orders) {
		List<Category> categories = getAllCategories();
		List<Sales> sales = new ArrayList<Sales>();
		for (Category category : categories) {
			float cashTotal = 0;
			float bankTotal = 0;
			Sales sale = new Sales();
			for (OrderDetail order : orders) {
				for (Item item : order.getItems()) {
					if (category.getName() == item.getProduct().getCategory().getName()) {
						sale.setCategory(category.getName());
						sale.setDate(order.getCreatedDate());
						if (order.getPaymentMode() != null && order.getPaymentMode() == PaymentMode.Cash) {
							cashTotal += order.getTotal();
						}
						if (order.getPaymentMode() != null && order.getPaymentMode() == PaymentMode.Bank) {
							bankTotal += order.getTotal();
						}
					}
				}
			}
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
