package com.istore.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.istore.model.Inventory;

@Repository
public interface InventoryRepository extends CrudRepository<Inventory, Integer> {
	@Query("update Inventory set availableUnits = availableUnits-?1 where id =?2")
	@Modifying()
	public void updateInventory(@Param("noOfUnits") Float noOfUnits, @Param("inventoryId") int inventoryId);
}
