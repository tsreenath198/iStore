package com.iStore.iStore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Stock;

@Repository
public interface StockRepository extends CrudRepository<Stock, Integer> {

}
