package com.istore.controller;

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

import com.istore.constants.ISTOREConstants;
import com.istore.model.GenericResponse;
import com.istore.model.User;
import com.istore.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.USER)
public class UserController {
	@Autowired
	UserService userService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<User> create(@RequestBody User user) {
		return new ResponseEntity<>(userService.createOrUpdate(user), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<User> update(@RequestBody User user) {
		return new ResponseEntity<>(userService.createOrUpdate(user), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<>(userService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<User> get(@RequestParam Integer id) {
		return new ResponseEntity<>(userService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<User>> getAll() {
		return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
	}
}
