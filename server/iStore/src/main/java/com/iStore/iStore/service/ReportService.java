package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.model.OrderDetailGroupInterface;

@Service
public interface ReportService {

	public List<OrderDetailGroupInterface> getTotalByGroup(String fromDate, String toDate, String groupBy);

	public List<OrderDetailGroupInterface> getTotalByValue(String type, Integer value, Integer month, Integer year,
			String fromDate, String toDate);

	public List<OrderDetail> findAllRecordsByDay(Integer value, Integer month, Integer year);
}
