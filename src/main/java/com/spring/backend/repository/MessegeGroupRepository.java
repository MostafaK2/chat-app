package com.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.spring.backend.model.MessegeGroup;

@Repository
public interface MessegeGroupRepository extends JpaRepository<MessegeGroup, Integer>{
	
	public List<MessegeGroup> findByUserId(Integer id);

	public List<MessegeGroup> findByConversationId(int convid);
}
