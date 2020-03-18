package com.iStore.iStore.service;

import java.text.ParseException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.ProfitInterface;

@Service
public interface ProfitService {

	List<ProfitInterface> getProfitByCategory(String fromDate, String toDate) throws ParseException;

	List<ProfitInterface> getProductByProduct(String fromDate, String toDate, String category);

}
