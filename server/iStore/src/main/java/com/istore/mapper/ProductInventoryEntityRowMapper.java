package com.istore.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.istore.model.ProductInventoryEntity;
import com.istore.model.ProductInventoryId;

public class ProductInventoryEntityRowMapper implements RowMapper<ProductInventoryEntity> {

	@Override
	public ProductInventoryEntity mapRow(ResultSet rs, int rowNum) throws SQLException {
		ProductInventoryEntity productInventoryEntity = new ProductInventoryEntity();
		ProductInventoryId id = new ProductInventoryId();
		id.setInventoryId(rs.getInt("Inventory_Id"));
		id.setProductId(rs.getInt("Product_Id"));
		productInventoryEntity.setProductInventoryId(id);
		productInventoryEntity.setUnitsRequired(rs.getInt("units_required"));
		return productInventoryEntity;
	}

}
