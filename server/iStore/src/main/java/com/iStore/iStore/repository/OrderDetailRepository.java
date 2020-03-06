package com.iStore.iStore.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.model.OrderDetailGroupInterface;
import com.iStore.iStore.model.OrderDetails;

@Repository
public interface OrderDetailRepository extends CrudRepository<OrderDetail, Integer> {

	Optional<OrderDetail> findByIdAndActiveFlag(Integer id, int i);

	List<OrderDetail> findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);

	OrderDetail findTopByOrderByIdDesc();

	@Query(value = "SELECT DISTINCT * FROM order_detail WHERE DATE(created_date)= :dt and active_flag=0", nativeQuery = true)
	List<OrderDetail> findAllByCreatedDate(String dt);

	@Query(value = "SELECT * FROM order_detail WHERE created_date >= :fromDate and created_date <=:toDate and active_flag=0 ORDER BY created_date DESC", nativeQuery = true)
	List<OrderDetail> findAllBetweenDates(@Param(value = "fromDate") Date fromDate,
			@Param(value = "toDate") Date toDate);

	@Query(value = "SELECT * FROM order_detail where   DATE(created_date) > (NOW() - INTERVAL :days DAY) and active_flag=0 ORDER BY created_date DESC ", nativeQuery = true)
	List<OrderDetail> findAllByDays(@Param(value = "days") int days);

	@Query(value = "SELECT COUNT(*) FROM order_detail", nativeQuery = true)
	Integer getTotalRecordsCount();

	@Query(value = "SELECT o.id as id,o.total as total,o.created_date as createdDate,o.updated_date as updatedDate,o.description as description,"
			+ "o.total_discount as totalDiscount,o.active_flag as activeFlag,o.payment_mode as paymentMode,o.contact as contact, MONTH(o.created_date) as month FROM order_detail o WHERE o.created_date >= :fromDate and o.created_date <=:toDate and o.active_flag=0 ORDER BY o.created_date  DESC ", nativeQuery = true)
	List<OrderDetails> getSalesByType(@Param(value = "fromDate") String fromDate,
			@Param(value = "toDate") String toDate);

	@Query(value = "select 'year' as type, year(od.created_date) as value, SUM(od.total) as sum from order_detail od where od.created_date > :fromDate and od.created_date <= :toDate group by Year(od.created_date)", nativeQuery = true)
	List<OrderDetailGroupInterface> findAllByYears(@Param(value = "fromDate") String fromDate,
			@Param(value = "toDate") String toDate);

	@Query(value = "select 'month' as type, Month(od.created_date) as value, SUM(od.total) as sum from order_detail od where od.created_date > :fromDate and od.created_date <= :toDate group by Month(od.created_date)", nativeQuery = true)
	List<OrderDetailGroupInterface> findAllByMonths(@Param(value = "fromDate") String fromDate,
			@Param(value = "toDate") String toDate);

}
