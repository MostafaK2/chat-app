package com.spring.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.backend.model.Messege;
import com.spring.backend.service.MessegeService;

@RestController
@RequestMapping("/api/v1")
public class MessegeController {
	
	@Autowired
	private MessegeService messegeService;
	
	@RequestMapping("messeges")
	public List<Messege> getAllMessege() {
		return messegeService.getAllMessege();
	}
	
	// remove this  method or only for admins
	@RequestMapping("messeges/{id}")
	public Messege getMessege(@PathVariable int id) {
		return messegeService.getMessegeByMessegeId(id);
	}
	
	@RequestMapping("conversation/{conversationId}/messeges")
	public List<Messege> getMessegeByConversationId(@PathVariable int conversationId){
		return messegeService.getMsgByConvId(conversationId);
		
	}
	
	@RequestMapping(value = "conversation/{conversationId}/messeges", method = RequestMethod.POST)
	public void addMessege(@PathVariable int conversationId,@RequestBody Messege messege) {
		
		messegeService.addMessegeData(conversationId, messege);
	}
	
	
	
	
}
