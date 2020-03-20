package com.iStore.iStore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.Category;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Product;
import com.iStore.iStore.repository.CategoryRepository;
import com.iStore.iStore.repository.ProductRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	CategoryRepository categoryRepo;

	@Autowired
	ProductRepository productRepository;
	@Autowired
	ProductService productService;

	@Override
	public Category createOrUpdate(Category entity) {
		try {
			Integer categoryId = entity.getId();
			if (categoryId != null) {
				List<Product> products = productService.getByCategoryId(categoryId);
				if (products.size() > 0) {
					products.forEach(product -> {
						System.out.println(product.getName());
						product.setDefaultDiscount(entity.getDefaultDiscount());
						productRepository.save(product);
					});
				}
			}
			return categoryRepo.save(entity);
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
			createOrUpdate(b);
			resp = new GenericResponse();
			resp.setMessage(id + " " + ISTOREConstants.DELETED);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return resp;
	}

	@Override
	public List<Category> getAll() {
		return (List<Category>) categoryRepo.findAllByActiveFlagAllIgnoreCaseOrderByCategoryOrderAsc(0);
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
