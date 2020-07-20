package com.istore.controller;

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

import com.istore.constants.ISTOREConstants;
import com.istore.model.GenericResponse;
import com.istore.model.Item;
import com.istore.service.ItemService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.BILL)
public class ItemController {
	@Autowired
	ItemService itemService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Iterable<Item>> create(@RequestBody List<Item> items) {
		return new ResponseEntity<>(itemService.create(items), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Item> update(@RequestBody Item item) {
		return new ResponseEntity<>(itemService.update(item), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<>(itemService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Item> get(@RequestParam Integer id) {
		return new ResponseEntity<>(itemService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Item>> getAll() {
		return new ResponseEntity<>(itemService.getAll(), HttpStatus.OK);
	}
}
