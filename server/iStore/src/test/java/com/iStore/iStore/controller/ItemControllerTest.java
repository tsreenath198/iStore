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
import com.iStore.iStore.model.Item;
import com.iStore.iStore.service.ItemService;

@RunWith(MockitoJUnitRunner.class)
public class ItemControllerTest {
	@InjectMocks
	ItemController controller;
	@Mock
	ItemService service;

	@Test
	public void testCreate() throws ParseException {
		Iterable<Item> item = new ArrayList<Item>();
		Mockito.when(service.create(Mockito.any())).thenReturn(item);
		service.create(Mockito.any());
	}

	@Test
	public void testupdate() throws ParseException {
		Item item = getItem();
		Mockito.when(service.update(Mockito.any())).thenReturn(item);
		service.update(Mockito.any());
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
		Item item = getItem();
		Mockito.when(service.get(Mockito.anyInt())).thenReturn(item);
		controller.get(Mockito.anyInt());
	}

	@Test
	public void testGetAll() {
		List<Item> value = new ArrayList<Item>();
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
