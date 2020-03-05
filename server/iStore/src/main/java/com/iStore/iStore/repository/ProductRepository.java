package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.iStore.iStore.model.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {

	List<Product> findByActiveFlagAllIgnoreCaseOrderByProductOrderAsc(Integer activeFlag);

	Optional<Product> findByIdAndActiveFlag(Integer id, Integer activeFlag);

	void save(Optional<Product> product);

	@Query(value = "UPDATE product SET inventory=inventory+:inventory WHERE id= :id", nativeQuery = true)
	@Modifying
	@Transactional
	void updateInventoryById(@Param(value = "id") Integer id, @Param(value = "inventory") Integer inventory);

	@Query(value = "SELECT product.* FROM product " + "	LEFT JOIN category ON product.category_id = category.id "
			+ "	WHERE product.category_id=category.id AND category.raw_material = 1 AND product.active_flag=0 "
			+ "	ORDER BY product.category_id ASC", nativeQuery = true)
	@Transactional
	List<Product> downloadInventory();

	@Query(value = "SELECT product.* FROM product WHERE product.category_id=:id", nativeQuery = true)
	List<Product> findByCategoryId(@Param(value = "id") Integer id);

}
