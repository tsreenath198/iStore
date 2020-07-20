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
import com.istore.model.Category;
import com.istore.model.GenericResponse;
import com.istore.service.CategoryService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.CATEGORY)
public class CategoryController {
	@Autowired
	CategoryService categoryService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Category> create(@RequestBody Category items) {
		return new ResponseEntity<>(categoryService.createOrUpdate(items), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Category> update(@RequestBody Category item) {
		return new ResponseEntity<>(categoryService.createOrUpdate(item), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<>(categoryService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Category> get(@RequestParam Integer id) {
		return new ResponseEntity<>(categoryService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Category>> getAll() {
		return new ResponseEntity<>(categoryService.getAll(), HttpStatus.OK);
	}
}
