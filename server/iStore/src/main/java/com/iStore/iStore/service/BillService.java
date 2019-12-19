package com.iStore.iStore.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.Bill;
import com.iStore.iStore.model.GenericResponse;

@Transactional
@Service
public interface BillService {
	public Bill create(Bill entity);

	public Bill update(Bill entity);

	public GenericResponse delete(Integer id);

	public List<Bill> getAll();

	public Bill get(Integer id);
}
