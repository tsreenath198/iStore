package com.istore.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ValidationException;

import org.hibernate.exception.ConstraintViolationException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.istore.model.Product;
import com.istore.repository.ProductRepository;

@RunWith(MockitoJUnitRunner.class)
public class ProductServiceImplTest {
	@Mock
	private ProductRepository repo;
	@InjectMocks
	private ProductServiceImpl serviceImpl;
	Product product = null;
	ConstraintViolationException cve = null;

	@Test
	public void testCreate() {
		product = new Product();
		when(repo.save(any(Product.class))).thenReturn(product);
		serviceImpl.createOrUpdate(product);
	}

	@Test(expected = ValidationException.class)
	public void testCreateException() {
		product = new Product();
		cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(Product.class))).thenThrow(cve);
		serviceImpl.createOrUpdate(product);
	}

	@Test
	public void testGetAll() {
		List<Product> value = new ArrayList<>();
		when(repo.findByActiveFlagAllIgnoreCaseOrderByNameAsc(anyInt())).thenReturn(value);
		serviceImpl.getAll();
	}
}
