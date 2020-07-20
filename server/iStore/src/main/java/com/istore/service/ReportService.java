package com.istore.service;

import java.util.List;

import com.istore.model.OrderDetail;
import com.istore.model.OrderDetailGroupInterface;

public interface ReportService {

	List<OrderDetailGroupInterface> getTotalByGroup(String fromDate, String toDate, String groupBy);

	List<OrderDetailGroupInterface> getTotalByValue(String type, Integer value, Integer month, Integer year,
			String fromDate, String toDate);

	List<OrderDetail> findAllRecordsByDay(Integer value, Integer month, Integer year);
}
