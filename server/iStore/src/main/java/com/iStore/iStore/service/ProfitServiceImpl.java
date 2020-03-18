package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.model.ProfitInterface;
import com.iStore.iStore.repository.OrderDetailRepository;

@Service
public class ProfitServiceImpl implements ProfitService {
	@Autowired
	OrderDetailRepository repository;

	@Override
	public List<ProfitInterface> getProfitByCategory(String fromDate, String toDate) throws ParseException {
		return repository.getProfitsByCategory(fromDate, toDate);
	}

	@Override
	public List<ProfitInterface> getProductByProduct(String fromDate, String toDate, String category) {
		return repository.getProfitsByProducts(fromDate, toDate, category);
	}

}
