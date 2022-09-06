package com.spring.backend;

import java.util.Optional;

import javax.annotation.PostConstruct;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.spring.backend.model.*;
import com.spring.backend.repository.UserRepository;

@SpringBootApplication
public class ChatAppBackendApplication {
	
	@PersistenceUnit
	private EntityManagerFactory emf;
	
	@Autowired
	private UserRepository userRepo; 
	
//  This should only be used for read operations
//	@PersistenceContex
//	private EntityManager;

	public static void main(String[] args) {
		SpringApplication.run(ChatAppBackendApplication.class, args);
	}
	
	
	@PostConstruct
	public void start() {
//		User u = new User();
//		u.setFname("John");
//		u.setLname("Smith");
//		u.setEmail("jsmith23@gmail.com");
//		u.setRole(UserType.USER);
//		
//		User u2 = new User();
//		u2.setFname("Kam");
//		u2.setLname("Smith");
//		u2.setEmail("kam23@gmail.com");
//		u2.setRole(UserType.USER);
//		
//		EntityManager em = emf.createEntityManager();
//		EntityTransaction et = em.getTransaction();
//		et.begin();
//		em.persist(u);
//		em.persist(u2);
//		et.commit();
//		
		
		
	}

}
