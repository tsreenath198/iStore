package com.istore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.istore.model.Expense;
import com.istore.model.GenericResponse;

@Service
public interface ExpenseService {
	Expense createOrUpdate(Expense entity);

	GenericResponse delete(Integer id);

	List<Expense> getAll();

	Expense get(Integer id);

}
