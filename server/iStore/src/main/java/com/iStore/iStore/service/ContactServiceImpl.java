package com.iStore.iStore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.Contact;
import com.iStore.iStore.model.ContactView;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.repository.ContactRepository;

@Service
public class ContactServiceImpl implements ContactService {
	@Autowired
	ContactRepository contactRepo;

	@Override
	public Contact createOrUpdate(Contact entity) {
		if (entity != null) {
			try {
				return contactRepo.save(entity);
			} catch (Exception e) {
				throw new ValidationException(e.getMessage());
			}
		}
		return null;
	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
		try {
			Contact b = get(id);
			b.setActiveFlag(1);
			createOrUpdate(b);
			resp = new GenericResponse();
			resp.setMessage(id + " " + ISTOREConstants.DELETED);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return resp;
	}

	@Override
	public List<ContactView> getAll() {
		return (List<ContactView>) contactRepo.getAll();
	}

	@Override
	public Contact get(Integer id) {
		Optional<Contact> contact = null;
		try {
			contact = contactRepo.getByIdAndActiveFlag(id);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (contact.isPresent())
			return contact.get();
		else
			throw new ValidationException("Record not found with the id" + id);
	}

	@Override
	public List<Contact> search(String searchKey) {
		if (searchKey != null) {
			searchKey = "%" + searchKey.replaceAll("%", "").toUpperCase() + "%";
			return contactRepo.search(searchKey);
		}
		return null;
	}

}
