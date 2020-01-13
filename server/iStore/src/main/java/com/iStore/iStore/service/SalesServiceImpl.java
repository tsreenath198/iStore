package com.iStore.iStore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.repository.SalesRepository;

@Service
public class SalesServiceImpl implements SalesService {
	@Autowired
	SalesRepository salesRepository;

	@Override
	public Integer get() {
		return null;
	}

}
