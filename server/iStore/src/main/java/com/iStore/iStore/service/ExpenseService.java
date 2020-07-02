package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.Expense;
import com.iStore.iStore.model.GenericResponse;

@Service
public interface ExpenseService {
	public Expense createOrUpdate(Expense entity);

	public GenericResponse delete(Integer id);

	public List<Expense> getAll();

	public Expense get(Integer id);

}
