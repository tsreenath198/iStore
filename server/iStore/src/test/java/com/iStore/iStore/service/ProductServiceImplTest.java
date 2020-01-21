package com.iStore.iStore.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.hibernate.exception.ConstraintViolationException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.iStore.iStore.model.Item;
import com.iStore.iStore.model.Product;
import com.iStore.iStore.repository.ProductRepository;

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
		serviceImpl.create(product);
	}

	@Test(expected = ValidationException.class)
	public void testCreateException() {
		product = new Product();
		cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(Product.class))).thenThrow(cve);
		serviceImpl.create(product);
	}

	@Test
	public void testUpdate() {
		Optional<Product> ca = Optional.of(getProduct());
		when(repo.findByIdAndActiveFlag(any(Integer.class), anyInt())).thenReturn(ca);
		when(repo.save(any(Product.class))).thenReturn(product);
		serviceImpl.update(product);
	}

	@Test(expected = ValidationException.class)
	public void testUpdateException() {
		Optional<Product> ca = Optional.of(getProduct());
		when(repo.findByIdAndActiveFlag(any(Integer.class), anyInt())).thenReturn(ca);
		cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(Product.class))).thenThrow(cve);
		serviceImpl.update(product);
	}

	@Test
	public void testGetAll() {
		List<Product> value = new ArrayList<Product>();
		when(repo.findByActiveFlagAllIgnoreCaseOrderByProductOrderAsc(Mockito.anyInt())).thenReturn(value);
		serviceImpl.getAll();
	}

	

	private Item getItem() {
		Item item = new Item();
		item.setDiscount(5);
		item.setOrderId(2);
		return null;
	}

	private Product getProduct() {
		product = new Product();
		product.setName("Juice");
		product.setId(2);
		return product;
	}

	@Test(expected = ValidationException.class)
	public void testGenericResponseException() {
		testUpdate();
		cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(Product.class))).thenThrow(cve);
		serviceImpl.delete(1);
	}

}
