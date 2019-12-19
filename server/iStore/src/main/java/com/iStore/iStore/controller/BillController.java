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
import com.iStore.iStore.model.Bill;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.service.BillService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.BILL)
public class BillController {
	@Autowired
	BillService billService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Iterable<Bill>> create(@RequestBody List<Bill> bills) {
		return new ResponseEntity<Iterable<Bill>>(billService.create(bills), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Bill> update(@RequestBody Bill bill) {
		return new ResponseEntity<Bill>(billService.update(bill), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<GenericResponse>(billService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Bill> get(@RequestParam Integer id) {
		return new ResponseEntity<Bill>(billService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Bill>> getAll() {
		return new ResponseEntity<List<Bill>>(billService.getAll(), HttpStatus.OK);
	}
}
