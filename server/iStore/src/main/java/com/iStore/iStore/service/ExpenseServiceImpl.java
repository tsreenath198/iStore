package com.iStore.iStore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.Expense;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.repository.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService {
	@Autowired
	ExpenseRepository expenseRepo;

	@Override
	public Expense createOrUpdate(Expense entity) {
		if (entity != null) {
			try {
				return expenseRepo.save(entity);
			} catch (Exception e) {
				throw new ValidationException(e.getMessage());
			}
		}
		return null;
	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
		try {
			Expense b = get(id);
			b.setActiveFlag(1);
			createOrUpdate(b);
			resp = new GenericResponse();
			resp.setMessage(id + " " + ISTOREConstants.DELETED);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return resp;
	}

	@Override
	public List<Expense> getAll() {
		return (List<Expense>) expenseRepo.findAllByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(0);
	}

	@Override
	public Expense get(Integer id) {
		Optional<Expense> expense = null;
		try {
			expense = expenseRepo.findByIdAndActiveFlag(id, 0);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (expense.isPresent())
			return expense.get();
		else
			throw new ValidationException("Record not found with the id" + id);
	}

}
