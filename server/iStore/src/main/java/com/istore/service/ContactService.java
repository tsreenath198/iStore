package com.istore.service;

import java.util.List;

import com.istore.model.Contact;
import com.istore.model.ContactView;
import com.istore.model.GenericResponse;

public interface ContactService {
	Contact createOrUpdate(Contact entity);

	GenericResponse delete(Integer id);

	List<ContactView> getAll();

	Contact get(Integer id);
	
	List<Contact> search(String searchKey);

}
