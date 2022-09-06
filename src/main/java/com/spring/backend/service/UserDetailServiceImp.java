package com.spring.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.backend.model.User;
import com.spring.backend.repository.UserRepository;
import com.spring.backend.util.CustomPasswordEncoder;


@Service
public class UserDetailServiceImp implements UserDetailsService{
	
//	@Autowired
//	private CustomPasswordEncoder customPasswordEncoder;
	
	@Autowired UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User u = new User();
//		u.setUsername(username);
//		u.setPassword(customPasswordEncoder.getPasswordEncoder().encode("admin"));
//		u.setId(1);
		Optional<User> userOpt = userRepository.findByUsername(username);
		
		return userOpt.orElseThrow(() -> new UsernameNotFoundException("Username or Password Invalid"));
	}

}
