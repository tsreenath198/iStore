package com.istore.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.ValidationException;

import com.istore.constants.ISTOREConstants;
import com.istore.constants.UserRole;
import com.istore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.istore.model.GenericResponse;
import com.istore.model.User;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
    UserRepository userRepo;

	@Override
	public User createOrUpdate(User entity) {
		if (entity != null) {
			try {
				entity.setToken(UUID.randomUUID().toString());
				return userRepo.save(entity);
			} catch (Exception e) {
				throw new ValidationException(e.getMessage());
			}
		}
		return null;
	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp;
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
		return userRepo.findAllByActiveFlagAllIgnoreCaseOrderByCreatedDateDesc(0);
	}

	@Override
	public User get(Integer id) {
		Optional<User> user;
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

	@Override
	public User validateUser(String name, String password) {
		User u;
		Optional<User> user = userRepo.validateUser(name, password);
		if (user.isPresent()) {
			u = user.get();
			if (u.getRole().equalsIgnoreCase(UserRole.Admin.toString())) {
				u.setRolesAllowed(Arrays.asList("All"));
			} else if (u.getRole().equalsIgnoreCase(UserRole.Associate.toString())) {
				u.setRolesAllowed(Arrays.asList("Bill"));
			} else if (u.getRole().equalsIgnoreCase(UserRole.Store_Manager.toString())) {
				u.setRolesAllowed(Arrays.asList("Bill", "Product", "Report", "Sales"));
			}
			return u;
		} else {
			throw new ValidationException("invalid Username and Password ");
		}
	}
}
