package com.iStore.iStore.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Product;
import com.iStore.iStore.service.ProductService;

@RunWith(MockitoJUnitRunner.class)
public class ProductControllerTest {
	@InjectMocks
	ProductController controller;
	@Mock
	ProductService service;

	@Test
	public void testCreate() throws ParseException {
		Product product = getProduct();
		Mockito.when(service.createOrUpdate(Mockito.any())).thenReturn(product);
		service.createOrUpdate(Mockito.any());
	}


	@Test
	public void testDelete() {
		GenericResponse gr = new GenericResponse();
		gr.setMessage("");
		Mockito.when(service.delete(Mockito.anyInt())).thenReturn(gr);
		controller.delete(Mockito.anyInt());
	}

	@Test
	public void testGet() {
		Product product = getProduct();
		Mockito.when(service.get(Mockito.anyInt())).thenReturn(product);
		controller.get(Mockito.anyInt());
	}

	@Test
	public void testGetAll() {
		List<Product> value = new ArrayList<Product>();
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
