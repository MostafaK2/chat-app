package com.spring.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.backend.util.CustomPasswordEncoder;
import com.spring.backend.dto.UserReadDto;
import com.spring.backend.model.User;
import com.spring.backend.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired 
	private CustomPasswordEncoder passwordEncoder;
	
	
	public List<User> getAllUsers(){
		List<User> users = new ArrayList<>();
		userRepository.findAll()
		.forEach(users::add);
		return users;
	}


	public User getUserById(int id) {
		User u = userRepository.findById(id).get();
		return u;
	}


	public void addUser(User user) {
		user.setPassword(passwordEncoder.getPasswordEncoder().encode(user.getPassword()));
		userRepository.save(user);
		
	}


	public void deleteUser(int id) {
		userRepository.deleteById(id);
		
	}


	public void updateUser(User newUser, int id) {
		userRepository.findById(id)
        .map(user -> {
        	String fname = newUser.getFname();
        	String lname = newUser.getLname();
        	
        	if(fname.length() > 0) {
        		user.setFname(fname);
        	}
        	if(lname.length() > 0) {
        		user.setLname(lname);
        	}
            return userRepository.save(user);
        });
        
		
	}

	
	// get service
	public List<UserReadDto> usersStartsWithFname(String fname) {
		Optional<List<User>> searchedUsers = userRepository.findByFnameStartingWith(fname);
		List<UserReadDto> response = new ArrayList<>(); 
		if(searchedUsers.isPresent()) {
			List<User> users = searchedUsers.get();
			for(User u : users) {
				response.add(new UserReadDto(u.getId(), u.getFname(), u.getLname()));
			}
		}
		return response;
		
	}
}
