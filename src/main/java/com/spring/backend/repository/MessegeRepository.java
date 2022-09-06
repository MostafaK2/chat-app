package com.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.backend.model.Messege;

@Repository
public interface MessegeRepository extends JpaRepository<Messege, Integer>{
	
	public List<Messege> findByConversationId(int id);
}
