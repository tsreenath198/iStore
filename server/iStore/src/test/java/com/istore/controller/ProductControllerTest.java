package com.istore.controller;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.istore.model.GenericResponse;
import com.istore.model.Product;
import com.istore.service.ProductService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;

@RunWith(MockitoJUnitRunner.class)
public class ProductControllerTest {
	@InjectMocks
	ProductController controller;
	@Mock
	ProductService service;

	@Test
	public void testCreate() {
		Product product = getProduct();
		Mockito.when(service.createOrUpdate(any())).thenReturn(product);
		service.createOrUpdate(any());
	}


	@Test
	public void testDelete() {
		GenericResponse gr = new GenericResponse();
		gr.setMessage("");
		Mockito.when(service.delete(anyInt())).thenReturn(gr);
		controller.delete(anyInt());
	}

	@Test
	public void testGet() {
		Product product = getProduct();
		Mockito.when(service.get(anyInt())).thenReturn(product);
		controller.get(anyInt());
	}

	@Test
	public void testGetAll() {
		List<Product> value = new ArrayList<>();
		value.add(getProduct());
		Mockito.when(service.getAll()).thenReturn(value);
		controller.getAll();
	}

	private Product getProduct() {
		Product product = new Product();
		product.setName("name");
		return product;
	}

}
