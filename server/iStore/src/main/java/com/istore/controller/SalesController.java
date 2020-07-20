package com.istore.controller;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.istore.constants.ISTOREConstants;
import com.istore.model.CategoryDetailInterface;
import com.istore.model.Sales;
import com.istore.service.SalesService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.SALES)
public class SalesController {
	@Autowired
	SalesService salesService;

	@GetMapping(ISTOREConstants.GET_TOTAL)
	public ResponseEntity<Map<Date, List<Sales>>> getSalesByDate(@RequestParam(required = false) int days)
			throws ParseException {
		return new ResponseEntity<>(salesService.getSalesByDate(days), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_BY_CATEGORY)
	public ResponseEntity<List<CategoryDetailInterface>> getSalesByCategory(
			@RequestParam String fromDate, @RequestParam String toDate)
			throws ParseException {
		return new ResponseEntity<>(salesService.getSalesByCategory(fromDate, toDate),
				HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_BY_PRODUCT)
	public ResponseEntity<List<CategoryDetailInterface>> getProductByProduct(
			@RequestParam String category, @RequestParam String fromDate,
			@RequestParam String toDate) {
		return new ResponseEntity<>(
				salesService.getProductByProduct(category, fromDate, toDate), HttpStatus.OK);
	}

}
