package com.iStore.iStore.controller;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.service.OrderDetailService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.ORDER)
public class OrderDetailController {
	@Autowired
	OrderDetailService orderDetailService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<OrderDetail> create(@RequestBody OrderDetail orders) {
		return new ResponseEntity<OrderDetail>(orderDetailService.create(orders), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<OrderDetail> update(@RequestBody OrderDetail order) {
		return new ResponseEntity<OrderDetail>(orderDetailService.update(order), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<GenericResponse>(orderDetailService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<OrderDetail> get(@RequestParam Integer id) {
		return new ResponseEntity<OrderDetail>(orderDetailService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<OrderDetail>> getAll() {
		return new ResponseEntity<List<OrderDetail>>(orderDetailService.getAll(), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_TOTAL)
	public ResponseEntity<Float> getTotalByDate(@RequestParam(required = false) String from,
			@RequestParam(required = false) String to) throws ParseException {
		return new ResponseEntity<Float>(orderDetailService.getTotalByDate(from, to), HttpStatus.OK);
	}
}
