package com.istore.controller;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.istore.model.Category;
import com.istore.model.GenericResponse;
import com.istore.service.CategoryService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;

@RunWith(MockitoJUnitRunner.class)
public class CategoryControllerTest {
	@InjectMocks
	CategoryController controller;
	@Mock
	CategoryService categoryService;

	@Test
	public void testCreate() {
		Category category = getCategory();
		Mockito.when(categoryService.createOrUpdate(any())).thenReturn(category);
		controller.create(category);
	}


	@Test
	public void testDelete() {
		GenericResponse gr = new GenericResponse();
		gr.setMessage("");
		Mockito.when(categoryService.delete(anyInt())).thenReturn(gr);
		controller.delete(anyInt());
	}

	@Test
	public void testGet() {
		Category category = getCategory();
		Mockito.when(categoryService.get(anyInt())).thenReturn(category);
		controller.get(anyInt());
	}

	@Test
	public void testGetAll() {
		List<Category> value = new ArrayList<>();
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
