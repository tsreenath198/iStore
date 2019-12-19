package com.iStore.iStore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Product;
import com.iStore.iStore.repository.BillRepository;

@Service
public class BillServiceImpl implements ProductService {
	@Autowired
	BillRepository repository;

	@Override
	public Product create(Product entity) {
		return null;
	}

	@Override
	public Product update(Product entity) {
		return null;
	}

	@Override
	public GenericResponse delete(Integer id) {
		return null;
	}

	@Override
	public List<Product> getAll() {
		return null;
	}

	@Override
	public Product get(Integer id) {
		return null;
	}

}
