package com.iStore.iStore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.Bill;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.repository.BillRepository;

@Service
public class BillServiceImpl implements BillService {
	@Autowired
	BillRepository repository;

	@Override
	public Iterable<Bill> create(List<Bill> entities) {
		try {
			return repository.saveAll(entities);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public Bill update(Bill entity) {
		try {
			Bill product = get(entity.getId());
			product.setDiscount(entity.getDiscount());
			product.setPrice(entity.getPrice());
			product.setProductId(entity.getProductId());
			product.setQuantity(entity.getQuantity());
			product.setTotal(entity.getTotal());
			return repository.save(product);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
		try {
			Bill b = get(id);
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
	public List<Bill> getAll() {
		return (List<Bill>) repository.findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(0);
	}

	@Override
	public Bill get(Integer id) {
		Optional<Bill> product = null;
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
