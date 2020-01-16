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
import com.iStore.iStore.model.Sales;
import com.iStore.iStore.service.SalesService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.SALES)
public class SalesController {
	@Autowired
	SalesService salesService;

	@GetMapping(ISTOREConstants.GET_TOTAL)
	public ResponseEntity<List<Sales>> getSalesByDate(@RequestParam(required = false) String dt) throws ParseException {
		return new ResponseEntity<List<Sales>>(salesService.getSalesByDate(dt), HttpStatus.OK);
	}
}
