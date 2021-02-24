package com.istore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.istore.model.MetaData;

@Repository
public interface MetaDataRepository extends CrudRepository<MetaData, Integer> {
}
