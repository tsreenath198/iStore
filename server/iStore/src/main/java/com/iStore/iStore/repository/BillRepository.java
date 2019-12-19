package com.iStore.iStore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Bill;

@Repository
public interface BillRepository extends CrudRepository<Bill, Integer> {


}
