package com.iStore.iStore.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.model.OrderDetailGroupInterface;
import com.iStore.iStore.repository.OrderDetailRepository;

@Service
public class ReportServiceImpl implements ReportService {
	@Autowired
	OrderDetailRepository orderRepository;

	@Override
	public List<OrderDetailGroupInterface> getTotalByGroup(String fromDate, String toDate, String groupBy) {
		List<OrderDetailGroupInterface> orders = new ArrayList<OrderDetailGroupInterface>();
		if (groupBy.equalsIgnoreCase("Month")) {

			orders = orderRepository.findAllByMonths(fromDate, toDate);
		} else {

			orders = orderRepository.findAllByYears(fromDate, toDate);
		}
		return orders;
	}

}
