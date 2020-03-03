package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

	Optional<User> findByIdAndActiveFlag(Integer id, int i);
	
	List<User> findAllByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);

	@Query(value = "SELECT * FROM user WHERE name= :name and password=:password and active_flag=0", nativeQuery = true)
	Optional<User> validateUser(@Param(value = "name") String name, @Param(value = "password") String password);

}
