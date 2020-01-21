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

}
