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
import com.iStore.iStore.model.Expense;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.service.ExpenseService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.EXPENSE)
public class ExpenseController {
	@Autowired
	ExpenseService expenseService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Expense> create(@RequestBody Expense expense) {
		return new ResponseEntity<Expense>(expenseService.createOrUpdate(expense), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Expense> update(@RequestBody Expense expense) {
		return new ResponseEntity<Expense>(expenseService.createOrUpdate(expense), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<GenericResponse>(expenseService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Expense> get(@RequestParam Integer id) {
		return new ResponseEntity<Expense>(expenseService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Expense>> getAll() {
		return new ResponseEntity<List<Expense>>(expenseService.getAll(), HttpStatus.OK);
	}
}
