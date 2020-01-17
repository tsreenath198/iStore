package com.iStore.iStore.service;

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

import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.repository.OrderDetailRepository;

@RunWith(MockitoJUnitRunner.class)
public class OrderDetailServiceImplTest {
	@Mock
	private OrderDetailRepository repo;
	@InjectMocks
	private OrderDetailServiceImpl service;
	OrderDetail orderdetail = null;
	ConstraintViolationException cve = null;

	@Test
	public void testCreate() {
		orderdetail = new OrderDetail();
		when(repo.save(any(OrderDetail.class))).thenReturn(orderdetail);
		service.create(orderdetail);
	}

	@Test(expected = ValidationException.class)
	public void testCreateException() {
		orderdetail = new OrderDetail();
		cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(OrderDetail.class))).thenThrow(cve);
		service.create(orderdetail);
	}

	@Test
	public void testUpdate() {
		orderdetail = new OrderDetail();
		orderdetail.setId(2);
		Optional<OrderDetail> ca = Optional.of(orderdetail);
		when(repo.findByIdAndActiveFlag(any(Integer.class), anyInt())).thenReturn(ca);
		when(repo.save(any(OrderDetail.class))).thenReturn(orderdetail);
		service.update(orderdetail);
	}

	@Test(expected = ValidationException.class)
	public void testUpdateException() {
		orderdetail = new OrderDetail();
		orderdetail.setId(2);
		Optional<OrderDetail> ca = Optional.of(orderdetail);
		when(repo.findByIdAndActiveFlag(any(Integer.class), anyInt())).thenReturn(ca);
		cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(OrderDetail.class))).thenThrow(cve);
		service.update(orderdetail);
	}

	@Test
	public void testGetAll() {
		List<OrderDetail> value = new ArrayList<OrderDetail>();
		when(repo.findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(Mockito.anyInt())).thenReturn(value);
		service.getAll();
	}

	@Test
	public void testGenericResponse() {
		testUpdate();
		service.delete(1);
	}

	@Test(expected = ValidationException.class)
	public void testGenericResponseException() {
		testUpdate();
		cve = new ConstraintViolationException(null, null, null);
		when(repo.save(any(OrderDetail.class))).thenThrow(cve);
		service.delete(1);
	}

}
