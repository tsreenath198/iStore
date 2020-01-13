package com.iStore.iStore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.service.SalesService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.SALES)
public class SalesController {
	@Autowired
	SalesService salesService;

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Integer> get() {
		return new ResponseEntity<Integer>(salesService.get(), HttpStatus.OK);
	}
}
