package com.iStore.iStore.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.hibernate.exception.ConstraintViolationException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.iStore.iStore.model.Bill;
import com.iStore.iStore.repository.BillRepository;

@RunWith(MockitoJUnitRunner.class)
public class BillServiceImplTest {

	@Mock
	private BillRepository repo;

	@InjectMocks
	private BillServiceImpl billServiceImpl;

	@Test
	public void testCreate() {
		List<Bill> bills = new ArrayList<Bill>();
		Bill bill = new Bill();
		bill.setDiscount(10);
		bill.setPrice((float) 1);
		bill.setProductId(10);
		bills.add(bill);
		List<Bill> mockBills = new ArrayList<Bill>();
		mockBills.add(bill);
		when(repo.saveAll(Mockito.anyList())).thenReturn(mockBills);
		billServiceImpl.create(bills);
	}

	@Test(expected = ValidationException.class)
	public void testExceptionCreate() {
		List<Bill> bills = new ArrayList<Bill>();
		Bill bill = new Bill();
		bill.setDiscount(10);
		bill.setPrice((float) 1);
		bill.setProductId(10);
		bills.add(bill);
		List<Bill> mockBills = new ArrayList<Bill>();
		mockBills.add(bill);
		ConstraintViolationException cve = new ConstraintViolationException(null, null, null);
		when(repo.saveAll(Mockito.anyList())).thenThrow(cve);
		billServiceImpl.create(bills);
	}

	@Test
	public void testUpdate() {
		Bill bill = new Bill();
		bill.setId(1);
		bill.setDiscount(10);
		bill.setPrice((float) 1);
		bill.setProductId(10);
		Optional<Bill> mockBill = Optional.of(bill);
		when(repo.findByIdAndActiveFlag(any(Integer.class), anyInt())).thenReturn(mockBill);
		when(repo.save(any(Bill.class))).thenReturn(bill);
		Bill found = billServiceImpl.update(bill);
		assertEquals(bill.getDiscount(), found.getDiscount());
	}

	@Test(expected = ValidationException.class)
	public void testExceptionUpdate() {
		Bill bill = new Bill();
		bill.setId(1);
		bill.setDiscount(10);
		bill.setPrice((float) 1);
		bill.setProductId(10);
		Optional<Bill> mockBill = Optional.of(bill);
		when(repo.findByIdAndActiveFlag(any(Integer.class), anyInt())).thenReturn(mockBill);
		ConstraintViolationException cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(Bill.class))).thenThrow(cve);
		Bill found = billServiceImpl.update(bill);
	}

}
