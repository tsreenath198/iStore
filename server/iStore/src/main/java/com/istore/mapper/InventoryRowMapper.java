package com.istore.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.istore.model.Inventory;

public class InventoryRowMapper implements RowMapper<Inventory> {

	@Override
	public Inventory mapRow(ResultSet rs, int rowNum) throws SQLException {
		Inventory inventory = new Inventory();
		inventory.setId(rs.getInt("id"));
		inventory.setName(rs.getString("name"));
		inventory.setUnitsPerQty(rs.getInt("units_per_qty"));
		inventory.setAvailableUnits(rs.getInt("available_units"));
		inventory.setMinAvailableUnits(rs.getInt("min_available_units"));
		return inventory;
	}

}
