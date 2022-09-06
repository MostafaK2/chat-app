package com.spring.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.backend.model.Conversation;
import com.spring.backend.repository.ConversationRepository;

@Service
public class ConversationService {
	
	@Autowired
	private ConversationRepository conversationRepo;

	public List<Conversation> getAllConversation() {
		List<Conversation> conversation = new ArrayList<>();
		conversationRepo.findAll()
		.forEach(conversation::add);
		return conversation;
	}

	public Object addConversation(Conversation conversation) {
		// TODO Auto-generated method stub
		conversationRepo.save(conversation);
		return null;
	}

	public Conversation getConversationById(int id) {
		return conversationRepo.findById(id).orElse(null);
	}

	public List<Conversation> getConversationByUserId(int id) {
		// TODO Auto-generated method stub
		return conversationRepo.getConversationsByUserId(id);
	}

	
	
	
}
