package com.istore.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.*;
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
import org.mockito.junit.MockitoJUnitRunner;

import com.istore.model.Item;
import com.istore.model.Product;
import com.istore.repository.ItemRepository;

@RunWith(MockitoJUnitRunner.class)
public class ItemServiceImplTest {

	@Mock
	private ItemRepository repo;
	Product pr = new Product();

	@InjectMocks
	private ItemServiceImpl billServiceImpl;

	@Test
	public void testCreate() {
		List<Item> items = new ArrayList<>();
		Item item = new Item();
		item.setDiscount(10);
		item.setPrice((float) 1);
		item.setProduct(pr);
		items.add(item);
		List<Item> mockItems = new ArrayList<>();
		mockItems.add(item);
		when(repo.saveAll(anyList())).thenReturn(mockItems);
		billServiceImpl.create(items);
	}

	@Test(expected = ValidationException.class)
	public void testExceptionCreate() {
		List<Item> items = new ArrayList<>();
		Item item = new Item();
		item.setDiscount(10);
		item.setPrice((float) 1);
		item.setProduct(pr);
		items.add(item);
		List<Item> mockBills = new ArrayList<>();
		mockBills.add(item);
		ConstraintViolationException cve = new ConstraintViolationException(null, null, null);
		when(repo.saveAll(anyList())).thenThrow(cve);
		billServiceImpl.create(items);
	}

	@Test
	public void testUpdate() {
		Item item = new Item();
		item.setId(1);
		item.setDiscount(10);
		item.setPrice((float) 1);
		item.setProduct(pr);
		when(repo.save(any(Item.class))).thenReturn(item);
		Item found = billServiceImpl.update(item);
		assertEquals(item.getDiscount(), found.getDiscount());
	}

	@Test(expected = ValidationException.class)
	public void testExceptionUpdate() {
		Item item = new Item();
		item.setId(1);
		item.setDiscount(10);
		item.setPrice((float) 1);
		item.setProduct(pr);
		ConstraintViolationException cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(Item.class))).thenThrow(cve);
		billServiceImpl.update(item);
	}

	@Test
	public void testDelete() {
		Optional<Item> value = Optional.of(new Item());
		when(repo.findByIdAndActiveFlag(any(Integer.class), anyInt())).thenReturn(value);
		Item item = new Item();
		when(repo.save(any(Item.class))).thenReturn(item);
		billServiceImpl.delete(123);
	}

}
