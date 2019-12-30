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
import com.iStore.iStore.model.Category;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.service.CategoryService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.CATEGORY)
public class CategoryController {
	@Autowired
	CategoryService categoryService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Category> create(@RequestBody Category items) {
		return new ResponseEntity<Category>(categoryService.create(items), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Category> update(@RequestBody Category item) {
		return new ResponseEntity<Category>(categoryService.update(item), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<GenericResponse>(categoryService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Category> get(@RequestParam Integer id) {
		return new ResponseEntity<Category>(categoryService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Category>> getAll() {
		return new ResponseEntity<List<Category>>(categoryService.getAll(), HttpStatus.OK);
	}
}
