package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Item;

@Service
public interface ItemService {
	public Iterable<Item> create(List<Item> entity);

	public Item update(Item entity);

	public GenericResponse delete(Integer id);

	public List<Item> getAll();

	public Item get(Integer id);
}
