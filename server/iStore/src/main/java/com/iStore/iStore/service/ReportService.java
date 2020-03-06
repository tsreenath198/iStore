package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.OrderDetailGroupInterface;

@Service
public interface ReportService {

	public List<OrderDetailGroupInterface> getTotalByGroup(String fromDate, String toDate, String groupBy);
}
