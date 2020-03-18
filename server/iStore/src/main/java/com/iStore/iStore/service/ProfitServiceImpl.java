package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.model.CategoryDetailInterface;
import com.iStore.iStore.model.ProfitInterface;
import com.iStore.iStore.model.Sales;
import com.iStore.iStore.repository.ProfitRepository;

@Service
public class ProfitServiceImpl implements ProfitService {
	@Autowired
	ProfitRepository repository;

	@Override
	public Map<Date, List<Sales>> getProfitByDate(int days) throws ParseException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ProfitInterface> getProfitByCategory(String fromDate, String toDate) throws ParseException {
		return repository.getProfitsByCategory(fromDate, toDate);
	}

	@Override
	public List<CategoryDetailInterface> getProductByProduct(String category, String fromDate, String toDate) {
		// TODO Auto-generated method stub
		return null;
	}

}
