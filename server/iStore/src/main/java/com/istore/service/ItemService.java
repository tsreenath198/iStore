package com.istore.service;

import java.util.List;

import com.istore.model.GenericResponse;
import com.istore.model.Item;

public interface ItemService {
	Iterable<Item> create(List<Item> entity);

	Item update(Item entity);

	GenericResponse delete(Integer id);

	List<Item> getAll();

	Item get(Integer id);
}
