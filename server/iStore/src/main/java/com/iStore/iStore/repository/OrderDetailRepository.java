package com.iStore.iStore.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.OrderDetail;

@Repository
public interface OrderDetailRepository extends CrudRepository<OrderDetail, Integer> {

	Optional<OrderDetail> findByIdAndActiveFlag(Integer id, int i);

	List<OrderDetail> findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);

	OrderDetail findTopByOrderByIdDesc();

	@Query(value = "SELECT DISTINCT * FROM order_detail WHERE DATE(created_date)= :dt and active_flag=0", nativeQuery = true)
	List<OrderDetail> findAllByCreatedDate(String dt);

//SELECT * FROM `order_detail` WHERE created_date >= '2020-01-06' and created_date <= '2020-01-08 23:59:59.999'
	@Query(value = "SELECT * FROM order_detail WHERE created_date >= :fromDate and created_date <= :toDate and active_flag=0 ORDER BY created_date DESC", nativeQuery = true)
	List<OrderDetail> findAllBetweenDates(@Param(value = "fromDate") Date fromDate,
			@Param(value = "toDate") Date toDate);

	@Query(value = "SELECT * FROM order_detail WHERE created_date >= :dt and active_flag=0 ORDER BY created_date DESC", nativeQuery = true)
	List<OrderDetail> findAllOnDate(@Param(value = "dt") Date dt);

	@Query(value = "SELECT * FROM order_detail where   DATE(created_date) > (NOW() - INTERVAL :days DAY) and active_flag=0 ORDER BY created_date DESC ", nativeQuery = true)
	List<OrderDetail> findAllByDays(@Param(value = "days") int days);

	@Query(value = "SELECT COUNT(*) FROM order_detail", nativeQuery = true)
	Integer getTotalRecordsCount();

}
