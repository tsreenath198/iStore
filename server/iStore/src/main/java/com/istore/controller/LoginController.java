package com.istore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.istore.constants.ISTOREConstants;
import com.istore.model.GenericResponse;
import com.istore.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.LOGIN)
public class LoginController {
	@Autowired
	UserService userService;

	@PostMapping(ISTOREConstants.VALIDATE_USER)
	public ResponseEntity create(@RequestParam String name, @RequestParam String password) {
		try {
			if (name != null && !name.isEmpty() && password != null && !password.isEmpty()) {
				return new ResponseEntity<>(userService.validateUser(name, password), HttpStatus.OK);
			}
		} catch (Exception e) {
			GenericResponse gr = new GenericResponse();
			gr.setMessage(e.getMessage());
			return new ResponseEntity<>(gr, HttpStatus.UNAUTHORIZED);
		}
		return null;
	}

}
