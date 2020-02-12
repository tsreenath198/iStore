package com.iStore.iStore.service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Item;
import com.iStore.iStore.model.Product;
import com.iStore.iStore.model.Stock;
import com.iStore.iStore.repository.ProductRepository;
import com.iStore.iStore.repository.StockRepository;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductRepository repository;
	@Autowired
	StockRepository stockRepository;

	@Autowired
	CategoryService categoryService;
	Stock stock = new Stock();

	@Override
	public Product createOrUpdate(Product entity) {
		try {
			return repository.save(entity);
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
			createOrUpdate(p);
			resp = new GenericResponse();
			resp.setMessage(id + " " + ISTOREConstants.DELETED);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return resp;
	}

	@Override
	public List<Product> getAll() {
		return (List<Product>) repository.findByActiveFlagAllIgnoreCaseOrderByProductOrderAsc(0);
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
			throw new ValidationException("Record not found with the id " + id);
	}

	@Override
	public void deleteInventory(List<Item> items) {
		items.forEach(i -> {
			Optional<Product> product = null;
			try {
				product = repository.findByIdAndActiveFlag(i.getProduct().getId(), 0);
				int inventory = product.get().getInventory() - i.getQuantity();
				if (inventory > -1) {
					product.get().setInventory(inventory);
					repository.save(product.get());
				} else {
					throw new ValidationException("Record not found with the product id " + i.getProduct().getId());
				}

			} catch (Exception e) {
				throw new ValidationException(e.getMessage());
			}
		});
	}

	@Override
	public void addInventory(List<Item> items) {
		items.forEach(i -> {
			Optional<Product> product = null;
			try {
				product = repository.findByIdAndActiveFlag(i.getProduct().getId(), 0);
				int inventory = product.get().getInventory() + i.getQuantity();
				if (inventory > -1) {
					product.get().setInventory(inventory);
					repository.save(product.get());
				} else {
					throw new ValidationException("Record not found with the product id " + i.getProduct().getId());
				}
			} catch (Exception e) {
				throw new ValidationException(e.getMessage());
			}
		});
	}

	@Override
	public GenericResponse setinventory(List<Product> products) {
		Stock stck = stockRepository.save(stock);
		GenericResponse gr = new GenericResponse();
		try {
			for (Iterator<Product> pro = products.iterator(); pro.hasNext();) {
				Product product = (Product) pro.next();
				repository.updateInventoryById(product.getId(), product.getInventory());
				product.setStockId(stck.getId());
			}
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		gr.setMessage("Successfully updated Inventory");
		return gr;
	}
}
