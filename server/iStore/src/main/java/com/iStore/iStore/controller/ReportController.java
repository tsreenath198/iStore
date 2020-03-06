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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.OrderDetailInterface;
import com.iStore.iStore.service.ReportService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.REPORT)
public class ReportController {
	@Autowired
	ReportService reportService;

	@GetMapping(ISTOREConstants.GET_TOTAL_BY_MONTH)
	public ResponseEntity<List<OrderDetailInterface>> getTotalByType(@RequestParam String fromDate, @RequestParam String toDate,

			 @RequestParam Integer value) throws ParseException, JsonProcessingException {
		return new ResponseEntity<List<OrderDetailInterface>>(reportService.getTotalByType(fromDate, toDate, value),
				HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_TOTAL_BY_YEARS)
	public ResponseEntity<List<OrderDetailInterface>> getTotalByYears(@RequestParam String fromDate,
			@RequestParam String toDate, @RequestParam String groupBy) throws ParseException, JsonProcessingException {
		return new ResponseEntity<List<OrderDetailInterface>>(reportService.getTotalByGroup(fromDate, toDate, groupBy),
				HttpStatus.OK);
	}

}
