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
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.User;
import com.iStore.iStore.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.USER)
public class UserController {
	@Autowired
	UserService userService;

	@PostMapping(ISTOREConstants.CREATE)
	public ResponseEntity<User> create(@RequestBody User user) {
		return new ResponseEntity<User>(userService.createOrUpdate(user), HttpStatus.OK);
	}

	@PutMapping(ISTOREConstants.UPDATE)
	public ResponseEntity<User> update(@RequestBody User user) {
		return new ResponseEntity<User>(userService.createOrUpdate(user), HttpStatus.OK);
	}

	@DeleteMapping(ISTOREConstants.DELETE)
	public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
		return new ResponseEntity<GenericResponse>(userService.delete(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET)
	public ResponseEntity<User> get(@RequestParam Integer id) {
		return new ResponseEntity<User>(userService.get(id), HttpStatus.OK);
	}

	@GetMapping(ISTOREConstants.GET_ALL)
	public ResponseEntity<List<User>> getAll() {
		return new ResponseEntity<List<User>>(userService.getAll(), HttpStatus.OK);
	}
}
