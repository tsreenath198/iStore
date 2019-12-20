package com.iStore.iStore.controller;

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
import com.iStore.iStore.model.Order;
import com.iStore.iStore.service.OrderService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.ORDER)
public class OrderController {
	@Autowired
	OrderService orderService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Order> create(@RequestBody Order orders) {
		return new ResponseEntity<Order>(orderService.create(orders), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Order> update(@RequestBody Order order) {
		return new ResponseEntity<Order>(orderService.update(order), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<GenericResponse>(orderService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Order> get(@RequestParam Integer id) {
		return new ResponseEntity<Order>(orderService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Order>> getAll() {
		return new ResponseEntity<List<Order>>(orderService.getAll(), HttpStatus.OK);
	}
}
