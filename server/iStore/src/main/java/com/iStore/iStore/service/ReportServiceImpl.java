package com.iStore.iStore.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.model.OrderDetailInterface;
import com.iStore.iStore.repository.OrderDetailRepository;

@Service
public class ReportServiceImpl implements ReportService {
	@Autowired
	OrderDetailRepository orderRepository;

	@Override
	public List<OrderDetailInterface> getTotalByGroup(String fromDate, String toDate, String groupBy) {
		List<OrderDetailInterface> orders = new ArrayList<OrderDetailInterface>();
		if (groupBy.equalsIgnoreCase("Month")) {

			orders = orderRepository.findAllByMonths(fromDate, toDate);
		} else {

			orders = orderRepository.findAllByYears(fromDate, toDate);
		}
		return orders;
	}

	@Override
	public List<OrderDetailInterface> getTotalByType(String fromDate, String toDate, Integer value) {
		return orderRepository.findAllByMonths(fromDate, toDate, value);
	}

}
