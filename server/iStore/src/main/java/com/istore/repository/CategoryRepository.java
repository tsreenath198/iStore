package com.istore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.istore.model.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> {

	Optional<Category> findByIdAndActiveFlag(Integer id, int i);

	List<Category> findAllByActiveFlagAllIgnoreCaseOrderByCategoryOrderAsc(int i);

}
