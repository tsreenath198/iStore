package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.OrderDetailInterface;

@Service
public interface ReportService {

	public List<OrderDetailInterface> getTotalByGroup(String fromDate, String toDate, String groupBy);

	public List<OrderDetailInterface> getTotalByType(String fromDate, String toDate, Integer value);
}
