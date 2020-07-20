package com.istore.service;

import com.istore.model.OrderDetail;
import com.istore.repository.ItemRepository;
import com.istore.repository.OrderDetailRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class OrderDetailServiceImplTest {
    @Mock
    private OrderDetailRepository repo;
    @Mock
    ItemRepository itemRepository;
    @InjectMocks
    private OrderDetailServiceImpl service;
    @Mock
    private ProductService productService;
    OrderDetail orderdetail = null;
    ConstraintViolationException cve = null;

    @Test
	@Ignore
    public void testCreate() {
        orderdetail = new OrderDetail();
        when(repo.save(any(OrderDetail.class))).thenReturn(orderdetail);
        service.create(orderdetail);
    }

    @Test(expected = ValidationException.class)
    public void testCreateException() {
        orderdetail = new OrderDetail();
        cve = new ConstraintViolationException(null, null, null);
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
        cve = new ConstraintViolationException(null, null, null);
        when(repo.save(any(OrderDetail.class))).thenThrow(cve);
        service.update(orderdetail);
    }

    @Test
    public void testGetAll() {
        List<OrderDetail> value = new ArrayList<>();
        when(repo.findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(anyInt())).thenReturn(value);
        service.getAll();
    }

    @Test
	@Ignore
    public void testGenericResponse() {
        testUpdate();
		service.delete(1);
    }

    @Test(expected = ValidationException.class)
    public void testGenericResponseException() {
        testUpdate();
        cve = new ConstraintViolationException(null, null, null);
        service.delete(1);
    }

}
