package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {

	List<Product> findByActiveFlagAllIgnoreCaseOrderByNameDesc(Integer activeFlag);

	Optional<Product> findByIdAndActiveFlag(Integer id, Integer activeFlag);

	void save(Optional<Product> product);

}
