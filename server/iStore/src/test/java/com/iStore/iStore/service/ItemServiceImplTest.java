package com.iStore.iStore.service;

import static org.junit.Assert.assertEquals;
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
import com.iStore.iStore.repository.ItemRepository;

@RunWith(MockitoJUnitRunner.class)
public class ItemServiceImplTest {

	@Mock
	private ItemRepository repo;
	Product pr = new Product();

	@InjectMocks
	private ItemServiceImpl billServiceImpl;

	@Test
	public void testCreate() {
		List<Item> items = new ArrayList<Item>();
		Item item = new Item();
		item.setDiscount(10);
		item.setPrice((float) 1);
		item.setProduct(pr);
		items.add(item);
		List<Item> mockItems = new ArrayList<Item>();
		mockItems.add(item);
		when(repo.saveAll(Mockito.anyList())).thenReturn(mockItems);
		billServiceImpl.create(items);
	}

	@Test(expected = ValidationException.class)
	public void testExceptionCreate() {
		List<Item> items = new ArrayList<Item>();
		Item item = new Item();
		item.setDiscount(10);
		item.setPrice((float) 1);
		item.setProduct(pr);
		items.add(item);
		List<Item> mockBills = new ArrayList<Item>();
		mockBills.add(item);
		ConstraintViolationException cve = new ConstraintViolationException(null, null, null);
		when(repo.saveAll(Mockito.anyList())).thenThrow(cve);
		billServiceImpl.create(items);
	}

	@Test
	public void testUpdate() {
		Item item = new Item();
		item.setId(1);
		item.setDiscount(10);
		item.setPrice((float) 1);
		item.setProduct(pr);
		Optional<Item> mockItem = Optional.of(item);
		when(repo.findByIdAndActiveFlag(any(Integer.class), anyInt())).thenReturn(mockItem);
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
		Optional<Item> mockItem = Optional.of(item);
		when(repo.findByIdAndActiveFlag(any(Integer.class), anyInt())).thenReturn(mockItem);
		ConstraintViolationException cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(Item.class))).thenThrow(cve);
		Item found = billServiceImpl.update(item);
	}

}
