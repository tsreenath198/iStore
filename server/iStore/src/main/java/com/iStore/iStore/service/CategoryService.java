package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.Category;
import com.iStore.iStore.model.GenericResponse;

@Service
public interface CategoryService {
	public Category createOrUpdate(Category entity);

	public GenericResponse delete(Integer id);

	public List<Category> getAll();

	public Category get(Integer id);
}
