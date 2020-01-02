package com.iStore.iStore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.Category;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	CategoryRepository categoryRepo;

	@Override
	public Category create(Category entity) {
		try {
			return categoryRepo.save(entity);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public Category update(Category entity) {
		try {
			Category category = get(entity.getId());
			category.setDefaultDiscount(entity.getDefaultDiscount());
			category.setDescription(entity.getDescription());
			category.setId(entity.getId());
			category.setName(entity.getName());
			category.setActiveFlag(entity.getActiveFlag());
			return categoryRepo.save(category);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
		try {
			Category b = get(id);
			b.setActiveFlag(1);
			update(b);
			resp = new GenericResponse();
			resp.setMessage(id + " " + ISTOREConstants.DELETED);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return resp;
	}

	@Override
	public List<Category> getAll() {
		return (List<Category>) categoryRepo.findByActiveFlagAllIgnoreCaseOrderByNameDesc(0);
	}

	@Override
	public Category get(Integer id) {
		Optional<Category> product = null;
		try {
			product = categoryRepo.findByIdAndActiveFlag(id, 0);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (product.isPresent())
			return product.get();
		else
			throw new ValidationException("Record not found with the id" + id);
	}
}
