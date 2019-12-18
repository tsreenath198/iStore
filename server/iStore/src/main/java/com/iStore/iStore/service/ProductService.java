package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Product;

@Service
public interface ProductService {
	public Product create(Product entity);

	public Product update(Product entity);

	public GenericResponse delete(Integer id);

	public List<Product> getAll();

	public Product get(Integer id);
}
