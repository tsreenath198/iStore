package com.istore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import com.istore.constants.ISTOREConstants;
import com.istore.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.istore.model.GenericResponse;
import com.istore.model.Item;

@Service
public class ItemServiceImpl implements ItemService {
	@Autowired
    ItemRepository itemRepo;

	@Override
	public Iterable<Item> create(List<Item> entities) {
		try {
			return itemRepo.saveAll(entities);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public Item update(Item entity) {
		try {
			return itemRepo.save(entity);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp;
		try {
			Item b = get(id);
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
	public List<Item> getAll() {
		return itemRepo.findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(0);
	}

	@Override
	public Item get(Integer id) {
		Optional<Item> product;
		try {
			product = itemRepo.findByIdAndActiveFlag(id, 0);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (product.isPresent())
			return product.get();
		else
			throw new ValidationException("Record not found with the id" + id);
	}
}
