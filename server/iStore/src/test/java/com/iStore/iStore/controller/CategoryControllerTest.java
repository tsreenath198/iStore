package com.iStore.iStore.controller;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.iStore.iStore.model.Category;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.service.CategoryService;

@RunWith(MockitoJUnitRunner.class)
public class CategoryControllerTest {
	@InjectMocks
	CategoryController controller;
	@Mock
	CategoryService categoryService;

	@Test
	public void testCreate() {
		Category category = getCategory();
		Mockito.when(categoryService.createOrUpdate(Mockito.any())).thenReturn(category);
		controller.create(category);
	}


	@Test
	public void testDelete() {
		GenericResponse gr = new GenericResponse();
		gr.setMessage("");
		Mockito.when(categoryService.delete(Mockito.anyInt())).thenReturn(gr);
		controller.delete(Mockito.anyInt());
	}

	@Test
	public void testGet() {
		Category category = getCategory();
		Mockito.when(categoryService.get(Mockito.anyInt())).thenReturn(category);
		controller.get(Mockito.anyInt());
	}

	@Test
	public void testGetAll() {
		List<Category> value = new ArrayList<Category>();
		value.add(getCategory());
		Mockito.when(categoryService.getAll()).thenReturn(value);
		controller.getAll();
	}

	private Category getCategory() {
		Category category = new Category();
		category.setActiveStatus(1);
		category.setDefaultDiscount(10);
		category.setDescription("s");
		category.setName("name");
		return category;
	}

}
