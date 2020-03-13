package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Contact;

@Repository
public interface ContactRepository extends CrudRepository<Contact, Integer> {
	@Query(value = "SELECT  * FROM contact WHERE id=:id and active_flag=0 and LENGTH(phone) >=10 and  phone REGEXP '[0-9]'", nativeQuery = true)
	Optional<Contact> getByIdAndActiveFlag(Integer id);

	@Query(value = "SELECT  * FROM contact WHERE active_flag=0 and LENGTH(phone) >=10 and  phone REGEXP '[0-9]' ORDER BY created_date DESC", nativeQuery = true)
	List<Contact> getAll();

	@Query(value = "SELECT * FROM contact WHERE LENGTH(phone) >=10 and (Upper(name) LIKE :searchKey OR phone LIKE :searchKey) GROUP BY name, phone", nativeQuery = true)
	List<Contact> search(@Param(value = "searchKey") String searchKey);
}
