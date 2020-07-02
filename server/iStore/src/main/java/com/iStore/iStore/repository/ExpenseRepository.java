package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Expense;

@Repository
public interface ExpenseRepository extends CrudRepository<Expense, Integer> {

	Optional<Expense> findByIdAndActiveFlag(Integer id, int i);

	List<Expense> findAllByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);

}
