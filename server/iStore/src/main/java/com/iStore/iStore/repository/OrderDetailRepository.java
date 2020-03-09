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
			+ "o.total_discount as totalDiscount,o.active_flag as activeFlag,o.payment_mode as paymentMode,o.contact as contact, MONTH(o.created_date) as month "
			+ "FROM order_detail o WHERE o.created_date >= :fromDate and o.created_date <=:toDate and o.active_flag=0 ORDER BY o.created_date  DESC ", nativeQuery = true)
	List<OrderDetails> getSalesByType(@Param(value = "fromDate") String fromDate,
			@Param(value = "toDate") String toDate);

	@Query(value = "select od.id as id,year(od.created_date) as year,month(od.created_date) as month,'year' as type, year(od.created_date) as value, "
			+ " ROUND(SUM(CASE WHEN od.payment_mode='Cash' THEN od.total ELSE 0 END)) as cashSum ,ROUND(SUM(CASE WHEN od.payment_mode='Bank' "
			+ "THEN od.total ELSE 0 END)) as bankSum , ROUND(SUM(od.total)) as sum from order_detail od where od.created_date > :fromDate and od.created_date <= :toDate and o.active_flag=0 "
			+ " group by Year(od.created_date) ORDER BY created_date DESC", nativeQuery = true)
	List<OrderDetailGroupInterface> findAllByGroupYears(@Param(value = "fromDate") String fromDate,
			@Param(value = "toDate") String toDate);

	@Query(value = "select od.id as id,year(od.created_date) as year,month(od.created_date) as month,'month' as type, Month(od.created_date) as value,"
			+ " ROUND(SUM(CASE WHEN od.payment_mode='Cash' THEN od.total ELSE 0 END)) as cashSum ,ROUND(SUM(CASE WHEN od.payment_mode='Bank' "
			+ "THEN od.total ELSE 0 END)) as bankSum , ROUND(SUM(od.total)) as sum from order_detail od where od.created_date > :fromDate and "
			+ "od.created_date <= :toDate and od.active_flag=0 group by Month(od.created_date) ORDER BY created_date DESC", nativeQuery = true)
	List<OrderDetailGroupInterface> findAllByGroupMonths(@Param(value = "fromDate") String fromDate,
			@Param(value = "toDate") String toDate);

	@Query(value = "select od.id as id,year(od.created_date) as year,month(od.created_date) as month,'day' as type, Day(od.created_date) as value,"
			+ " ROUND(SUM(CASE WHEN od.payment_mode='Cash' THEN od.total ELSE 0 END)) as cashSum ,ROUND(SUM(CASE WHEN od.payment_mode='Bank' "
			+ "THEN od.total ELSE 0 END)) as bankSum , ROUND(SUM(od.total)) as sum from order_detail od where od.created_date > :fromDate and "
			+ "od.created_date <= :toDate and o.active_flag=0 group by Year(od.created_date), Month(od.created_date) , Day(od.created_date) ORDER BY created_date DESC", nativeQuery = true)
	List<OrderDetailGroupInterface> findAllByGroupDays(@Param(value = "fromDate") String fromDate,
			@Param(value = "toDate") String toDate);

	@Query(value = "select od.id as id,year(od.created_date) as year,month(od.created_date) as month,'month' as type, Month(od.created_date) as value, "
			+ " ROUND(SUM(CASE WHEN od.payment_mode='Cash' THEN od.total ELSE 0 END)) as cashSum ,ROUND(SUM(CASE WHEN od.payment_mode='Bank' "
			+ "THEN od.total ELSE 0 END)) as bankSum , ROUND(SUM(od.total)) as sum  from order_detail od where year(od.created_date)=:value and od.active_flag=0 "
			+ "group by Month(od.created_date) ORDER BY created_date DESC", nativeQuery = true)
	List<OrderDetailGroupInterface> findAllByYear(@Param(value = "value") Integer value);

	@Query(value = "select od.id as id,year(od.created_date) as year,month(od.created_date) as month,'day' as type, Day(od.created_date) as value, "
			+ " ROUND(SUM(CASE WHEN od.payment_mode='Cash' THEN od.total ELSE 0 END)) as cashSum ,ROUND(SUM(CASE WHEN od.payment_mode='Bank' "
			+ "THEN od.total ELSE 0 END)) as bankSum , ROUND(SUM(od.total)) as sum from order_detail od where month(od.created_date)=:value and year(od.created_date)=:year "
			+ "and  od.created_date > :fromDate and od.created_date <= :toDate and od.active_flag=0"
			+ " group by Day(od.created_date) ORDER BY created_date DESC", nativeQuery = true)
	List<OrderDetailGroupInterface> findAllByMonth(@Param(value = "year") Integer year,
			@Param(value = "value") Integer value, @Param(value = "fromDate") String fromDate,
			@Param(value = "toDate") String toDate);

	@Query(value = "select od.id as id,year(od.created_date) as year,month(od.created_date) as month,'day' as type, Day(od.created_date) as value, "
			+ " ROUND(SUM(CASE WHEN od.payment_mode='Cash' THEN od.total ELSE 0 END)) as cashSum ,ROUND(SUM(CASE WHEN od.payment_mode='Bank' "
			+ "THEN od.total ELSE 0 END)) as bankSum , ROUND(SUM(od.total)) as sum  from order_detail od where month(od.created_date)=:month and year(od.created_date)=:year"
			+ " and day(od.created_date)=:value and  od.created_date > :fromDate and od.created_date <= :toDate and od.active_flag=0 "
			+ "group by Day(od.created_date) ORDER BY created_date DESC", nativeQuery = true)
	List<OrderDetailGroupInterface> findAllByDay(@Param(value = "year") Integer year,
			@Param(value = "month") Integer month, @Param(value = "value") Integer value,
			@Param(value = "fromDate") String fromDate, @Param(value = "toDate") String toDate);

	@Query(value = "select * from order_detail od where year(od.created_date)=:year and month(od.created_date)=:month and day(od.created_date)=:value and od.active_flag=0 ", nativeQuery = true)
	List<OrderDetail> findAllRecordsByDay(@Param(value = "year") Integer year, @Param(value = "month") Integer month,
			@Param(value = "value") Integer value);

}
