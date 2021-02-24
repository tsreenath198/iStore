package com.istore.service;

import java.util.List;

import com.istore.model.GenericResponse;
import com.istore.model.Inventory;
import com.istore.model.MetaData;

public interface InventoryService {
	Inventory createOrUpdate(Inventory entity);

	List<Inventory> getAll();

	Inventory get(Integer id);

	String backUpTable();

	List<MetaData> retrieveAll();

	GenericResponse delete(Integer id);

	List<Inventory> read(String tableName);
}
