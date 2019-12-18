package com.iStore.iStore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Product;
import com.iStore.iStore.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductRepository repository;

	@Override
	public Product create(Product entity) {
		try {
			return repository.save(entity);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

	}

	@Override
	public Product update(Product entity) {
		try {
			Product product = get(entity.getId());
			product.setName(entity.getName());
			product.setPrice(entity.getPrice());
			return repository.save(product);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
		try {
			Product p = get(id);
			p.setActiveFlag(1);
			update(p);
			resp = new GenericResponse();
			resp.setMessage(id + " " + ISTOREConstants.DELETED);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return resp;
	}

	@Override
	public List<Product> getAll() {
		return (List<Product>) repository.findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(0);
	}

	@Override
	public Product get(Integer id) {
		Optional<Product> product = null;
		try {
			product = repository.findByIdAndActiveFlag(id, 0);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (product.isPresent())
			return product.get();
		else
			throw new ValidationException("Record not found with the id" + id);
	}

}
