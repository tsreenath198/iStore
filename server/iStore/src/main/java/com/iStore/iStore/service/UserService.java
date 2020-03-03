package com.iStore.iStore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.User;

@Service
public interface UserService {
	public User createOrUpdate(User entity);

	public GenericResponse delete(Integer id);

	public List<User> getAll();

	public User get(Integer id);

}
