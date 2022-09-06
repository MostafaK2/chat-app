package com.spring.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.backend.model.Conversation;
import com.spring.backend.model.Messege;
import com.spring.backend.repository.MessegeRepository;

@Service
public class MessegeService {
	
	@Autowired
	private MessegeRepository messegeRepo;
	

	
	public List<Messege> getAllMessege() {
		// TODO Auto-generated method stub	
		List<Messege> messeges = new ArrayList<>();
		messegeRepo.findAll().forEach(messeges::add);
		
		return messeges;
	}

	// adds a messege to the messegeTable
	public void addMessegeData(int conversationId, Messege messege) {
		Date currentSaveTime =  new Date(System.currentTimeMillis());
		messege.setSentDatetime(currentSaveTime);
		
		messege.setConversation(new Conversation(conversationId, "", ""));
		
		messegeRepo.save(messege);
	}

	// gets a messege based on the messegeId
	public Messege getMessegeByMessegeId(int id) {
		return messegeRepo.findById(id).orElse(null);
	}

	public List<Messege> getMsgByConvId(int conversationId) {
		// TODO Auto-generated method stub
		return messegeRepo.findByConversationId(conversationId);
	}
	
	
}
