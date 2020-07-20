package com.istore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.istore.model.GenericResponse;
import com.istore.model.User;

@Service
public interface UserService {
	User createOrUpdate(User entity);

	GenericResponse delete(Integer id);

	List<User> getAll();

	User get(Integer id);

	User validateUser(String name, String password);

}
