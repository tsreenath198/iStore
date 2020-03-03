package com.iStore.iStore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.User;
import com.iStore.iStore.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.LOGIN)
public class LoginController {
	@Autowired
	UserService userService;

	@PostMapping(ISTOREConstants.VALIDATE_USER)
	public ResponseEntity<?> create(@RequestParam String name, @RequestParam String password) {
		try {
			if (name != null && !name.isEmpty() && password != null && !password.isEmpty()) {
				return new ResponseEntity<User>(userService.validateUser(name, password), HttpStatus.OK);
			}
		} catch (Exception e) {
			GenericResponse gr = new GenericResponse();
			gr.setMessage(e.getMessage());
			return new ResponseEntity<GenericResponse>(gr, HttpStatus.UNAUTHORIZED);
		}
		return null;
	}

}
