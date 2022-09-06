package com.spring.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.backend.dto.UserReadDto;
import com.spring.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	
	// either returns nothing or a user
	Optional<User> findByUsername(String username);
	
//	@Query("SELECT u.id, u.fname, u.lname FROM User u WHERE u.fname LIKE :firstname%")
	public Optional<List<User>> findByFnameStartingWith(String fname);
	

}
