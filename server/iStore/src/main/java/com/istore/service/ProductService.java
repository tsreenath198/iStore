package com.istore.service;

import java.util.List;

import com.istore.model.GenericResponse;
import com.istore.model.Item;
import com.istore.model.Product;

public interface ProductService {
	Product createOrUpdate(Product entity);

	GenericResponse delete(Integer id);

	List<Product> getAll();

	Product get(Integer id);

	// void deleteInventory(List<Item> items);

	void addInventory(List<Item> items);

	// GenericResponse setinventory(List<Product> product);

	// byte[] downloadInventory(Map<String, List<Product>> products) throws
	// IOException;

	// Map<String, List<Product>> getCurrentInventory();

	List<Product> getByCategoryId(Integer categoryId);

}
