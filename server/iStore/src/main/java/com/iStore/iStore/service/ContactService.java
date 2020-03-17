package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.Contact;
import com.iStore.iStore.model.ContactView;
import com.iStore.iStore.model.GenericResponse;

@Service
public interface ContactService {
	public Contact createOrUpdate(Contact entity);

	public GenericResponse delete(Integer id);

	public List<ContactView> getAll();

	public Contact get(Integer id);
	
	public List<Contact> search(String searchKey);

}
