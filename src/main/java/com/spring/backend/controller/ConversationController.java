package com.spring.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.backend.model.Conversation;
import com.spring.backend.service.ConversationService;

@RestController
@RequestMapping("/api/v1")
public class ConversationController {
	
	@Autowired
	private ConversationService convService;
	
	@RequestMapping("conversations")
	public List<Conversation> getAllConversation() {
		return convService.getAllConversation();
	}
	
	@RequestMapping("conversation/{id}")
	public Conversation getConversationById(@PathVariable int id) {
		return convService.getConversationById(id);
	}
	
	// gets a specific user conversations based on a user id
	@RequestMapping("user/{id}/conversations")
	public List<Conversation> getConversationByUserId(@PathVariable int id){
		return convService.getConversationByUserId(id);
	}
	
	
	
	@RequestMapping(method = RequestMethod.POST , value = "conversations")
	public ResponseEntity<?> addConversation(@RequestBody Conversation conversation) {
		convService.addConversation(conversation);
		return ResponseEntity.ok()
				.body(conversation);
	}
	
	
}
