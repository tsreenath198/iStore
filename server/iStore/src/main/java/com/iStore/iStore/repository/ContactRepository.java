package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Contact;
import com.iStore.iStore.model.ContactView;

@Repository
public interface ContactRepository extends CrudRepository<Contact, Integer> {
	@Query(value = "SELECT  * FROM contact WHERE id=:id and active_flag=0 and LENGTH(phone) >=10 and  phone REGEXP '[0-9]'", nativeQuery = true)
	Optional<Contact> getByIdAndActiveFlag(Integer id);

	@Query(value = "SELECT id as id, name as name, phone as phone,created_date as createdDate,updated_date as updatedDate,"
			+ "description as description, active_flag as activeFlag,subscribe as subscribe, last_contact_date as lastContactDate,"
			+ "COUNT(phone) as count FROM contact WHERE LENGTH(phone) >=10 and active_flag=0  GROUP BY phone ORDER BY COUNT(phone) DESC", nativeQuery = true)
	List<ContactView> getAll();

	@Query(value = "SELECT * FROM contact WHERE LENGTH(phone) >=10 and (Upper(name) LIKE :searchKey OR phone LIKE :searchKey) GROUP BY name, phone", nativeQuery = true)
	List<Contact> search(@Param(value = "searchKey") String searchKey);
}
