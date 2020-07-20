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
import com.istore.model.Item;
import com.istore.service.ItemService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;

@RunWith(MockitoJUnitRunner.class)
public class ItemControllerTest {
	@InjectMocks
	ItemController controller;
	@Mock
	ItemService service;

	@Test
	public void testCreate() {
		Iterable<Item> item = new ArrayList<>();
		Mockito.when(service.create(any())).thenReturn(item);
		service.create(any());
	}

	@Test
	public void testupdate() {
		Item item = getItem();
		Mockito.when(service.update(any())).thenReturn(item);
		service.update(any());
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
		Item item = getItem();
		Mockito.when(service.get(anyInt())).thenReturn(item);
		controller.get(anyInt());
	}

	@Test
	public void testGetAll() {
		List<Item> value = new ArrayList<>();
		value.add(getItem());
		Mockito.when(service.getAll()).thenReturn(value);
		controller.getAll();
	}

	private Item getItem() {
		Item item = new Item();
		item.setDescription("");
		return item;
	}

}
