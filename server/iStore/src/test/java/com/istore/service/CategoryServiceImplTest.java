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

import com.istore.model.Category;
import com.istore.repository.CategoryRepository;

@RunWith(MockitoJUnitRunner.class)
public class CategoryServiceImplTest {
	@Mock
	private CategoryRepository categoryRepo;
	@InjectMocks
	private CategoryServiceImpl serviceImpl;
	Category category = null;
	ConstraintViolationException cve = null;

	@Test
	public void testCreate() {
		category = new Category();
		when(categoryRepo.save(any(Category.class))).thenReturn(category);
		serviceImpl.createOrUpdate(category);
	}

	@Test(expected = ValidationException.class)
	public void testCreateException() {
		category = new Category();
		cve = new ConstraintViolationException(null, null, null);
		when(categoryRepo.save(any(Category.class))).thenThrow(cve);
		serviceImpl.createOrUpdate(category);
	}

	@Test
	public void testGetAll() {
		List<Category> value = new ArrayList<>();
		when(categoryRepo.findAllByActiveFlagAllIgnoreCaseOrderByCategoryOrderAsc(anyInt())).thenReturn(value);
		serviceImpl.getAll();
	}

}
