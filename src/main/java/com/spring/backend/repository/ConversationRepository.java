package com.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.backend.model.Conversation;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Integer>{
	
	@Query("SELECT DISTINCT c FROM Conversation c LEFT JOIN MessegeGroup mg on c.id = mg.conversation.id where mg.user.id = ?#{[0]}")
	public List<Conversation> getConversationsByUserId(int id);
}
