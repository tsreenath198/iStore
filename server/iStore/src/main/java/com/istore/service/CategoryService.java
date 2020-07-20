package com.istore.service;

import java.util.List;

import com.istore.model.Category;
import com.istore.model.GenericResponse;

public interface CategoryService {
	Category createOrUpdate(Category entity);

	GenericResponse delete(Integer id);

	List<Category> getAll();

	Category get(Integer id);
}
