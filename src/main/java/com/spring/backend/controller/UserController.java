package com.spring.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.backend.dto.UserReadDto;
import com.spring.backend.model.User;
import com.spring.backend.service.UserService;

@RestController
@RequestMapping("/api/v1")

public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	
	@RequestMapping("users")
	public List<User> getAllUser(){
		return userService.getAllUsers();
	}
	
	@RequestMapping("user/{id}")
	public User getUser(@PathVariable int id) {
		return userService.getUserById(id);
	}
	
	@RequestMapping("search/users/{fname}")
	public List<UserReadDto> getUserByFirstName(@PathVariable String fname) {
		return userService.usersStartsWithFname(fname);
	}
	
	//do this :: adds a user to the database 
	@RequestMapping(method = RequestMethod.POST, value="users")
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="users/{id}")
	public void addUser(@RequestBody User user, @PathVariable int id) {
		userService.updateUser(user);
	}
	
	// Deletes the user from the database, implement deleting user from messege groups and password tables
	@RequestMapping(method = RequestMethod.DELETE, value="users/{id}")
	public void deleteTopic(@PathVariable int id) {
		userService.deleteUser(id);
	}

}
