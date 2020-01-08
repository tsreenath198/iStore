package com.iStore.iStore.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.OrderDetail;

@Repository
public interface OrderDetailRepository extends CrudRepository<OrderDetail, Integer> {

	Optional<OrderDetail> findByIdAndActiveFlag(Integer id, int i);

	List<OrderDetail> findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);

	OrderDetail findTopByOrderByIdDesc();

	@Query(value = "SELECT * FROM order_detail WHERE created_date>= :dt", nativeQuery = true)
	List<OrderDetail> findAllByCreatedDate(Date dt);

//SELECT * FROM `order_detail` WHERE created_date >= '2020-01-06' and created_date <= '2020-01-08 23:59:59.999'
	@Query(value = "SELECT * FROM order_detail WHERE created_date >= :fromDate and created_date <= :toDate+ '23:59:59.999'", nativeQuery = true)
	List<OrderDetail> findAllBetweenDates(java.sql.Date fromDate, java.sql.Date toDate);

}
