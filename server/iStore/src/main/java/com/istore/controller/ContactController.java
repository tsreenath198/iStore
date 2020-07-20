package com.istore.controller;

import com.istore.constants.ISTOREConstants;
import com.istore.model.Contact;
import com.istore.model.ContactView;
import com.istore.model.GenericResponse;
import com.istore.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.CONTACT)
public class ContactController {
    @Autowired
    ContactService contactService;

    @PostMapping(ISTOREConstants.CREATE)
    public ResponseEntity<Contact> create(@RequestBody Contact contact) {
        return new ResponseEntity<>(contactService.createOrUpdate(contact), HttpStatus.OK);
    }

    @PutMapping(ISTOREConstants.UPDATE)
    public ResponseEntity<Contact> update(@RequestBody Contact contact) {
        return new ResponseEntity<>(contactService.createOrUpdate(contact), HttpStatus.OK);
    }

    @DeleteMapping(ISTOREConstants.DELETE)
    public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
        return new ResponseEntity<GenericResponse>(contactService.delete(id), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET)
    public ResponseEntity<Contact> get(@RequestParam Integer id) {
        return new ResponseEntity<>(contactService.get(id), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET_ALL)
    public ResponseEntity<List<ContactView>> getAll() {
        return new ResponseEntity<>(contactService.getAll(), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.SEARCH)
    public ResponseEntity<List<Contact>> search(@RequestParam String searchKey) {
        return new ResponseEntity<>(contactService.search(searchKey), HttpStatus.OK);
    }
}
