package com.iStore.iStore.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.ProfitInterface;
import com.iStore.iStore.service.ProfitService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.PROFITANDLOSS)
public class ProfitController {
	@Autowired
	ProfitService profitService;

	@GetMapping(ISTOREConstants.GET_BY_CATEGORY)
	public ResponseEntity<List<ProfitInterface>> getProfitByCategory(@RequestParam(required = true) String fromDate,
			@RequestParam(required = true) String toDate) throws ParseException {
		return new ResponseEntity<List<ProfitInterface>>(profitService.getProfitByCategory(fromDate, toDate),
				HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_BY_PRODUCT)
	public ResponseEntity<List<ProfitInterface>> getProductByProduct(@RequestParam(required = true) String category,
			@RequestParam(required = true) String fromDate, @RequestParam(required = true) String toDate)
			throws ParseException {
		return new ResponseEntity<List<ProfitInterface>>(profitService.getProductByProduct(fromDate, toDate, category),
				HttpStatus.OK);
	}

}
