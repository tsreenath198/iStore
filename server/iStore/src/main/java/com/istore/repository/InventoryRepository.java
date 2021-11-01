package com.istore.repository;

import com.istore.model.Expense;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.istore.model.Inventory;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@Repository
public interface InventoryRepository extends CrudRepository<Inventory, Integer> {
	@Query("update Inventory set availableUnits = availableUnits-?1 where id =?2")
	@Modifying()
	@Transactional
	public void updateInventory(@Param("noOfUnits") @NotNull Integer noOfUnits, @Param("inventoryId") int inventoryId);

	@Query("update Inventory set availableUnits = availableUnits+?1 where id =?2")
	@Modifying()
	@Transactional
	public void addInventory(@Param("noOfUnits") @NotNull Integer noOfUnits, @Param("inventoryId") int inventoryId);

	Optional<Inventory> findById(Integer id);
}
