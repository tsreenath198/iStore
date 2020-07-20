package com.istore.service;

import java.util.List;

import com.istore.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.istore.model.ProfitInterface;
import com.istore.util.DateHelper;

@Service
public class ProfitServiceImpl implements ProfitService {
	@Autowired
    OrderDetailRepository repository;

	@Override
	public List<ProfitInterface> getProfitByCategory(String fromDate, String toDate) {
		String uptoDate = DateHelper.getNextDay(toDate);
		return repository.getProfitsByCategory(fromDate, uptoDate);
	}

	@Override
	public List<ProfitInterface> getProductByProduct(String fromDate, String toDate, String category) {
		String uptoDate = DateHelper.getNextDay(toDate);
		return repository.getProfitsByProducts(fromDate, uptoDate, category);
	}

}
