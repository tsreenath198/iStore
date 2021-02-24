package com.istore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.istore.model.ProductInventoryEntity;
import com.istore.model.ProductInventoryId;

@Repository
public interface ProductInventoryEntityRepository extends CrudRepository<ProductInventoryEntity, ProductInventoryId> {

}
