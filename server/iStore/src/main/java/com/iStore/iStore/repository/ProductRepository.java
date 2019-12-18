package com.iStore.iStore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {
	
}
