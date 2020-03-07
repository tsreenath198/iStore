package com.iStore.iStore.controller;

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

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.OrderDetails;
import com.iStore.iStore.model.Sales;
import com.iStore.iStore.service.SalesService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.SALES)
public class SalesController {
	@Autowired
	SalesService salesService;

	@GetMapping(ISTOREConstants.GET_TOTAL)
	public ResponseEntity<Map<Date, List<Sales>>> getSalesByDate(@RequestParam(required = false) int days)
			throws ParseException {
		return new ResponseEntity<Map<Date, List<Sales>>>(salesService.getSalesByDate(days), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GROUP_BY)
	public ResponseEntity<Map<Integer, List<OrderDetails>>> getSalesByType(
			@RequestParam(required = false) String groupBy, @RequestParam(required = false) String fromDate,
			@RequestParam(required = false) String toDate) throws ParseException {
		return new ResponseEntity<Map<Integer, List<OrderDetails>>>(
				salesService.getSalesByType(groupBy, fromDate, toDate), HttpStatus.OK);
	}

	
	
}
