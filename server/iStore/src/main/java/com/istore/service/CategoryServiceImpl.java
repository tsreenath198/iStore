package com.istore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import com.istore.constants.ISTOREConstants;
import com.istore.repository.CategoryRepository;
import com.istore.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.istore.model.Category;
import com.istore.model.GenericResponse;
import com.istore.model.Product;

@Service
@Slf4j
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
				if (!products.isEmpty()) {
					products.forEach(product -> {
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
		GenericResponse resp;
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
		return categoryRepo.findAllByActiveFlagAllIgnoreCaseOrderByCategoryOrderAsc(0);
	}

	@Override
	public Category get(Integer id) {
		Optional<Category> product;
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
