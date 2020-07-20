package com.istore.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

import com.istore.constants.ISTOREConstants;
import com.istore.model.GenericResponse;
import com.istore.model.Product;
import com.istore.service.ProductService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.PRODUCT)
public class ProductController {
	public static final String CONTENT_TYPE_EXCEL = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	@Autowired
	ProductService productService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Product> create(@RequestBody Product product) {
		return new ResponseEntity<>(productService.createOrUpdate(product), HttpStatus.CREATED);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Product> update(@RequestBody Product product) {
		return new ResponseEntity<>(productService.createOrUpdate(product), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<>(productService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Product> get(@RequestParam Integer id) {
		return new ResponseEntity<>(productService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Product>> getAll() {
		return new ResponseEntity<>(productService.getAll(), HttpStatus.OK);
	}

	@PostMapping(ISTOREConstants.SET_INVENTORY)
	public ResponseEntity<GenericResponse> setInventory(@RequestBody List<Product> product) {
		return new ResponseEntity<>(productService.setinventory(product), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.CURRENT_INVENTORY)
	public ResponseEntity<Map<String, List<Product>>> getCurrentInventory() {
		return new ResponseEntity<>(productService.getCurrentInventory(), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.DOWNLOAD_INVENTORY)
	public GenericResponse downloadInventory(@RequestBody Map<String, List<Product>> products,
			HttpServletResponse httpServletResponse) throws IOException {
		byte[] bytes = productService.downloadInventory(products);
		GenericResponse gr = new GenericResponse();
		try {
			httpServletResponse.setContentType(CONTENT_TYPE_EXCEL);
			httpServletResponse.setHeader("Expires", "0");
			httpServletResponse.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
			httpServletResponse.setHeader("Pragma", "public");
			httpServletResponse.addHeader("Content-Type",
					CONTENT_TYPE_EXCEL);
			httpServletResponse.setHeader("Content-Disposition", "attachment; filename=inventory.xlsx");
			ServletOutputStream servletOutputStream = httpServletResponse.getOutputStream();
			servletOutputStream.write(bytes);
			servletOutputStream.flush();
			servletOutputStream.close();
			gr.setMessage(ISTOREConstants.SUCCESS);
		} catch (Exception exception) {
			System.out.println("exceptions");
		}
		return gr;

	}
}
