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

import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.service.OrderDetailService;

@RunWith(MockitoJUnitRunner.class)
public class OrderDetailControllerTest {
	@InjectMocks
	OrderDetailController controller;
	@Mock
	OrderDetailService service;

	@Test
	public void testCreate() throws ParseException {
		OrderDetail od = getOrderDetail();
		Mockito.when(service.create(Mockito.any())).thenReturn(od);
		service.create(Mockito.any());
	}

	@Test
	public void testupdate() throws ParseException {
		OrderDetail od = getOrderDetail();
		Mockito.when(service.update(Mockito.any())).thenReturn(od);
		service.update(Mockito.any());
	}

	@Test
	public void testDelete() {
		GenericResponse gr = new GenericResponse();
		gr.setMessage("");
		Mockito.when(service.delete(Mockito.anyInt())).thenReturn(gr);
		controller.delete(Mockito.anyInt());
	}

	@Test
	public void testGet() {
		OrderDetail od = getOrderDetail();
		Mockito.when(service.get(Mockito.anyInt())).thenReturn(od);
		controller.get(Mockito.anyInt());
	}

	@Test
	public void testGetAll() {
		List<OrderDetail> value = new ArrayList<OrderDetail>();
		value.add(getOrderDetail());
		Mockito.when(service.getAll()).thenReturn(value);
		controller.getAll();
	}

	private OrderDetail getOrderDetail() {
		OrderDetail orderDetail = new OrderDetail();
		orderDetail.setDescription("");
		return orderDetail;
	}

}
