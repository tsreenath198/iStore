package com.iStore.iStore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iStore.iStore.model.Contact;

@Repository
public interface ContactRepository extends CrudRepository<Contact, Integer> {

	Optional<Contact> findByIdAndActiveFlag(Integer id, int i);

	List<Contact> findAllByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(int i);

}
