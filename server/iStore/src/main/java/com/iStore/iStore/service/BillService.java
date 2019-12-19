package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.Bill;
import com.iStore.iStore.model.GenericResponse;

@Service
public interface BillService {
	public Iterable<Bill> create(List<Bill> entity);

	public Bill update(Bill entity);

	public GenericResponse delete(Integer id);

	public List<Bill> getAll();

	public Bill get(Integer id);
}
