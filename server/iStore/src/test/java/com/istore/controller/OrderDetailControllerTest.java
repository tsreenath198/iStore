package com.istore.controller;

import com.istore.model.GenericResponse;
import com.istore.model.OrderDetail;
import com.istore.service.OrderDetailService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;

@RunWith(MockitoJUnitRunner.class)
public class OrderDetailControllerTest {
    @InjectMocks
    OrderDetailController controller;
    @Mock
    OrderDetailService service;

    @Test
    public void testCreate() {
        OrderDetail od = getOrderDetail();
        Mockito.when(service.create(any())).thenReturn(od);
        service.create(any());
    }

    @Test
    public void testupdate() {
        OrderDetail od = getOrderDetail();
        Mockito.when(service.update(any())).thenReturn(od);
        service.update(any());
    }

    @Test
    public void testDelete() {
        GenericResponse gr = new GenericResponse();
        gr.setMessage("");
        Mockito.when(service.delete(anyInt())).thenReturn(gr);
        controller.delete(anyInt());
    }

    @Test
    public void testGet() {
        OrderDetail od = getOrderDetail();
        Mockito.when(service.get(anyInt())).thenReturn(od);
        controller.get(anyInt());
    }

    @Test
    public void testGetAll() {
        List<OrderDetail> value = new ArrayList<>();
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
