package com.iStore.iStore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Item;
import com.iStore.iStore.repository.ItemRepository;

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
			Item item = get(entity.getId());
			item.setDiscount(entity.getDiscount());
			item.setPrice(entity.getPrice());
			item.setProductId(entity.getProductId());
			item.setQuantity(entity.getQuantity());
			item.setTotal(entity.getTotal());
			return itemRepo.save(item);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
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
		return (List<Item>) itemRepo.findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(0);
	}

	@Override
	public Item get(Integer id) {
		Optional<Item> product = null;
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
