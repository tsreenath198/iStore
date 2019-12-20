package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer> {

	Optional<Order> findByIdAndActiveFlag(Integer id, int i);

	List<Order> findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);

}
