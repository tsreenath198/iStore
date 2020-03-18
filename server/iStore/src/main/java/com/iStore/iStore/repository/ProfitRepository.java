package com.iStore.iStore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.OrderDetail;
import com.iStore.iStore.model.ProfitInterface;

@Repository
public interface ProfitRepository extends CrudRepository<OrderDetail, Integer> {

	@Query(value = "SELECT c.name as name,	round(sum(i.total - i.quantity * p.unit_price)) as profit FROM order_detail od "
			+ "			left outer join item i on od.id = i.order_id "
			+ "            left outer join product p on i.product_id = p.id "
			+ "            left outer join category c on p.category_id = c.id "
			+ "            where od.active_flag=0 and od.created_date > :fromDate and od.created_date < :toDate GROUP by c.name ORDER BY sum(i.total - i.quantity * p.unit_price) DESC", nativeQuery = true)
	List<ProfitInterface> getProfitsByCategory(@Param(value = "fromDate") String fromDate,
			@Param(value = "toDate") String toDate);

}
