package com.iStore.iStore.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

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
import com.iStore.iStore.model.Product;
import com.iStore.iStore.service.ProductService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.PRODUCT)
public class ProductController {
	@Autowired
	ProductService productService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Product> create(@RequestBody Product product) throws IOException {
		return new ResponseEntity<Product>(productService.createOrUpdate(product), HttpStatus.CREATED);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Product> update(@RequestBody Product product) {
		return new ResponseEntity<Product>(productService.createOrUpdate(product), HttpStatus.OK);
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

	@PostMapping(ISTOREConstants.SET_INVENTORY)
	public ResponseEntity<GenericResponse> setInventory(@RequestBody List<Product> product) {
		return new ResponseEntity<GenericResponse>(productService.setinventory(product), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.DOWNLOAD_INVENTORY)
	public void downloadInventory(HttpServletResponse httpServletResponse) throws IOException {
		byte[] bytes = productService.downloadInventory();
		try {
			httpServletResponse.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			httpServletResponse.setHeader("Expires", "0");
			httpServletResponse.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
			httpServletResponse.setHeader("Pragma", "public");
			httpServletResponse.addHeader("Content-Type",
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			httpServletResponse.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			httpServletResponse.setHeader("Content-Disposition",
					"attachment; filename=inventory.xlsx");
			ServletOutputStream servletOutputStream = httpServletResponse.getOutputStream();
			servletOutputStream.write(bytes);
			servletOutputStream.flush();
			servletOutputStream.close();
		} catch (Exception exception) {
			System.out.println("exceptions");
		}
		
	}
}
