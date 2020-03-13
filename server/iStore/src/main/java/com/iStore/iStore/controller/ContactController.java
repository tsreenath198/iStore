package com.iStore.iStore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.Contact;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.service.ContactService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.CONTACT)
public class ContactController {
	@Autowired
	ContactService contactService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<Contact> create(@RequestBody Contact contact) {
		return new ResponseEntity<Contact>(contactService.createOrUpdate(contact), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<Contact> update(@RequestBody Contact contact) {
		return new ResponseEntity<Contact>(contactService.createOrUpdate(contact), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<GenericResponse>(contactService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<Contact> get(@RequestParam Integer id) {
		return new ResponseEntity<Contact>(contactService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<Contact>> getAll() {
		return new ResponseEntity<List<Contact>>(contactService.getAll(), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.SEARCH)
	public ResponseEntity<List<Contact>> search(@RequestParam String searchKey) {
		return new ResponseEntity<List<Contact>>(contactService.search(searchKey), HttpStatus.OK);
	}
}
