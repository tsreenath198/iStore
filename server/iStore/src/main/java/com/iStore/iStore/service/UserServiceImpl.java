package com.iStore.iStore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.User;
import com.iStore.iStore.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepo;

	@Override
	public User createOrUpdate(User entity) {
		if (entity != null) {
			try {
				if (entity.getName() != null && entity.getPassword() != null && entity.getConfirmPassword() != null) {
					return userRepo.save(entity);
				}
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
			User b = get(id);
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
	public List<User> getAll() {
		return (List<User>) userRepo.findAllByActiveFlagAllIgnoreCase(0);
	}

	@Override
	public User get(Integer id) {
		Optional<User> user = null;
		try {
			user = userRepo.findByIdAndActiveFlag(id, 0);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (user.isPresent())
			return user.get();
		else
			throw new ValidationException("Record not found with the id" + id);
	}
}
