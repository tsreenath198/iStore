package com.istore.service;

import java.util.ArrayList;
import java.util.List;

import com.istore.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.istore.model.OrderDetail;
import com.istore.model.OrderDetailGroupInterface;
import com.istore.util.DateHelper;

@Service
public class ReportServiceImpl implements ReportService {
	@Autowired
    OrderDetailRepository orderRepository;

	@Override
	public List<OrderDetailGroupInterface> getTotalByGroup(String fromDate, String toDate, String groupBy) {
		String uptoDate = DateHelper.getNextDay(toDate);
		List<OrderDetailGroupInterface> orders = new ArrayList<>();
		if (groupBy.equalsIgnoreCase("year")) {
			orders = orderRepository.findAllByGroupYears(fromDate, uptoDate);
		} else if (groupBy.equalsIgnoreCase("month")) {
			orders = orderRepository.findAllByGroupMonths(fromDate, uptoDate);
		} else if (groupBy.equalsIgnoreCase("day")) {
			orders = orderRepository.findAllByGroupDays(fromDate, uptoDate);
		}
		return orders;
	}

	@Override
	public List<OrderDetailGroupInterface> getTotalByValue(String type, Integer value, Integer month, Integer year,
			String fromDate, String toDate) {
		String uptoDate = DateHelper.getNextDay(toDate);
		List<OrderDetailGroupInterface> orders;
		if (type.equalsIgnoreCase("year")) {
			orders = orderRepository.findAllByYear(value, fromDate, uptoDate);
		} else if (type.equalsIgnoreCase("month")) {
			orders = orderRepository.findAllByMonth(year, value, fromDate, uptoDate);
		} else {
			orders = orderRepository.findAllByDay(year, month, value, fromDate, uptoDate);
		}
		return orders;

	}

	// 08462224999
	@Override
	public List<OrderDetail> findAllRecordsByDay(Integer value, Integer month, Integer year) {
		return orderRepository.findAllRecordsByDay(year, month, value);
	}

}
