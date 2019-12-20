package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.OrderDetail;

@Repository
public interface OrderDetailRepository extends CrudRepository<OrderDetail, Integer> {

	Optional<OrderDetail> findByIdAndActiveFlag(Integer id, int i);

	List<OrderDetail> findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);

}
