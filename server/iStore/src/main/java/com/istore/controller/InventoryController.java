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
import com.istore.model.Inventory;
import com.istore.model.MetaData;
import com.istore.service.InventoryService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.INVENTORY)
public class InventoryController {
	@Autowired
	InventoryService inventoryService;

	@GetMapping(ISTOREConstants.RECORD_INVENTORY)
	public ResponseEntity<GenericResponse> recordInventory() {
		return new ResponseEntity<GenericResponse>(inventoryService.backUpTable(), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_INVENTORY_METADATA)
	public ResponseEntity<List<MetaData>> getMetaData() {
		return new ResponseEntity<>(inventoryService.retrieveAll(), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_BY_TABLENAME)
	public ResponseEntity<List<Inventory>> getByTableName(@RequestParam String tableName) {
		return new ResponseEntity<>(inventoryService.read(tableName), HttpStatus.OK);
	}

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Inventory> create(@RequestBody Inventory inventory) {
		return new ResponseEntity<>(inventoryService.createOrUpdate(inventory), HttpStatus.CREATED);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Inventory> update(@RequestBody Inventory inventory) {
		return new ResponseEntity<>(inventoryService.createOrUpdate(inventory), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Inventory> get(@RequestParam Integer id) {
		return new ResponseEntity<>(inventoryService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Inventory>> getAll() {
		return new ResponseEntity<>(inventoryService.getAll(), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<>(inventoryService.delete(id), HttpStatus.OK);
	}
}
