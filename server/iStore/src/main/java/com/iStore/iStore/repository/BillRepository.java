package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Bill;

@Repository
public interface BillRepository extends CrudRepository<Bill, Integer> {

	Optional<Bill> findByIdAndActiveFlag(Integer id, int i);

	List<Bill> findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);


}
