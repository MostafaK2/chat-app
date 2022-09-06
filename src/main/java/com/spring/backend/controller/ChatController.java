package com.spring.backend.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.spring.backend.dto.MessegeDto;
import com.spring.backend.model.Conversation;
import com.spring.backend.model.Messege;
import com.spring.backend.service.MessegeService;

@Controller
public class ChatController {
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@Autowired
	private MessegeService messegeService;
	
	@MessageMapping("/message") // /app/message
	@SendTo("/topic/public")
	public Messege recievePublicMessage(@Payload Messege message) {
		return message;
	}

	// change to DTO, save messege and return messege.
	@MessageMapping("/group-message")
	public Messege recieveGroupMessege(@Payload MessegeDto messegeDto) {
		String sendToStr = "/topic/" + messegeDto.getConversationId()+"/group";
		Conversation conversation = new Conversation(messegeDto.getConversationId(), null, null);
		
		Messege messege = new Messege();
		messege.setFromuser(messegeDto.getFromuser());
		messege.setMessegeTexts(messegeDto.getMessegeTexts());
			
		
		simpMessagingTemplate.convertAndSend(sendToStr, messege);
		messegeService.addMessegeData(messegeDto.getConversationId(), messege);
		return messege;
	}
	
}
