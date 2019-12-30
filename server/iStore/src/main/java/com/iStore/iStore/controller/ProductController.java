package com.iStore.iStore.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.ValidationException;

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
import org.springframework.web.multipart.MultipartFile;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Product;
import com.iStore.iStore.service.ProductService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.PRODUCT)
public class ProductController {
	@Autowired
	ProductService productService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Product> create(@RequestParam Float price, @RequestParam Integer inventory,
			@RequestParam String name, @RequestParam("categoryId") Integer categoryId,
			@RequestParam("file") MultipartFile file) throws IOException {
		Product product = null;
		try {
			product = productService.populateProduct(name, inventory, price, categoryId, file.getBytes());
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return new ResponseEntity<Product>(productService.create(product), HttpStatus.CREATED);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Product> update(@RequestBody Product product) {
		return new ResponseEntity<Product>(productService.update(product), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<GenericResponse>(productService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Product> get(@RequestParam Integer id) {
		return new ResponseEntity<Product>(productService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Product>> getAll() {
		return new ResponseEntity<List<Product>>(productService.getAll(), HttpStatus.OK);
	}
}
