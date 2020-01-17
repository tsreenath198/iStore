package com.iStore.iStore.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.iStore.iStore.model.Sales;
import com.iStore.iStore.service.SalesService;

@RunWith(MockitoJUnitRunner.class)
public class SalesControllerTest {
	@InjectMocks
	SalesController controller;
	@Mock
	SalesService service;

	@Test
	public void testCreate() throws ParseException {
		List<Sales> sales = getSales();
		Mockito.when(service.getSalesByDate(Mockito.anyString())).thenReturn(sales);
		controller.getSalesByDate(Mockito.anyString());
	}

	private List<Sales> getSales() {
		List<Sales> s = new ArrayList<Sales>();
		Sales sale = new Sales();
		sale.setBankTotal((float) 10);
		sale.setCashTotal((float) 10);
		s.add(sale);
		return s;
	}

}
