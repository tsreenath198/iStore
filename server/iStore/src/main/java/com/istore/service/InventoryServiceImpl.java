package com.istore.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.istore.mapper.InventoryRowMapper;
import com.istore.model.GenericResponse;
import com.istore.model.Inventory;
import com.istore.model.MetaData;
import com.istore.repository.InventoryRepository;
import com.istore.repository.MetaDataRepository;
import com.istore.util.DateHelper;

@Service
public class InventoryServiceImpl implements InventoryService {
	@Autowired
	@Qualifier("jdbcTemplate")
	JdbcTemplate jdbcTemplate;

	@Autowired
	InventoryRepository inventoryRepository;
	@Autowired
	MetaDataRepository metaDataRepository;

	@Override
	public Inventory createOrUpdate(Inventory entity) {
		try {
			return inventoryRepository.save(entity);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public List<Inventory> getAll() {
		return (List<Inventory>) inventoryRepository.findAll();
	}

	@Override
	public List<Inventory> read(String tableName) {
		String sql = ("SELECT * FROM ").concat(tableName);
		return jdbcTemplate.query(sql, new InventoryRowMapper());
	}

	@Override
	public List<MetaData> retrieveAll() {
		return (List<MetaData>) metaDataRepository.findAll();
	}

	@Override
	public Inventory get(Integer id) {
		Optional<Inventory> inventory;
		try {
			inventory = inventoryRepository.findById(id);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (inventory.isPresent())
			return inventory.get();
		else
			throw new ValidationException("Record not found with the id " + id);
	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse response = new GenericResponse();
		try {
			inventoryRepository.deleteById(id);
			response.setMessage("SUCCESS");
			return response;
		} catch (Exception e) {
			response.setMessage(e.getMessage());
			return response;
		}

	}

	@Override
	public String backUpTable() {
		String table = "inventory";
		try {
			String tableToCreate = table.concat("_").concat(DateHelper.convertDateToStringPattern(new Date()));
			String sql = "CREATE TABLE ".concat(tableToCreate).concat(" AS SELECT * FROM ").concat(table);
			jdbcTemplate.execute(sql.toString());
			MetaData metaData = new MetaData();
			metaData.setTableName(tableToCreate);
			metaDataRepository.save(metaData);
			return table.concat(" successfully backup data");
		} catch (Exception e) {
			return table.concat(" table already exists");
		}
	}

}
