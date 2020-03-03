package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

	Optional<User> findByIdAndActiveFlag(Integer id, int i);

	List<User> findAllByActiveFlagAllIgnoreCase(int i);

}
