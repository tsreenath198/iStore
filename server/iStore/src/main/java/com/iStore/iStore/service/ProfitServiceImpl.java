package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.model.ProfitInterface;
import com.iStore.iStore.repository.OrderDetailRepository;
import com.iStore.iStore.util.DateHelper;

@Service
public class ProfitServiceImpl implements ProfitService {
	@Autowired
	OrderDetailRepository repository;

	@Override
	public List<ProfitInterface> getProfitByCategory(String fromDate, String toDate) throws ParseException {
		String uptoDate = DateHelper.getNextDay(toDate);
		return repository.getProfitsByCategory(fromDate, uptoDate);
	}

	@Override
	public List<ProfitInterface> getProductByProduct(String fromDate, String toDate, String category) {
		String uptoDate = DateHelper.getNextDay(toDate);
		return repository.getProfitsByProducts(fromDate, uptoDate, category);
	}

}
