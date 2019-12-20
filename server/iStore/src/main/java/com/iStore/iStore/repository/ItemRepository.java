package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Item;

@Repository
public interface ItemRepository extends CrudRepository<Item, Integer> {

	Optional<Item> findByIdAndActiveFlag(Integer id, int i);

	List<Item> findByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);


}
