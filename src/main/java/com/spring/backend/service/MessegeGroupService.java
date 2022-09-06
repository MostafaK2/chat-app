package com.spring.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.backend.dto.UserReadDto;
import com.spring.backend.model.Conversation;
import com.spring.backend.model.MessegeGroup;
import com.spring.backend.model.User;
import com.spring.backend.model.UserType;
import com.spring.backend.repository.MessegeGroupRepository;

@Service
public class MessegeGroupService {
	
	@Autowired
	MessegeGroupRepository msgGrpRepo;

	public List<MessegeGroup> getAllMessegeGroup() {
		List<MessegeGroup> msgGrp = new ArrayList<>();
		msgGrpRepo.findAll().forEach(msgGrp ::  add);
		return msgGrp;
	}

	public void addGroupMember(int userid, int convId) {
		Date currentSaveTime =  new Date(System.currentTimeMillis());
		User user = new User(userid, "","","");
		Conversation conv = new Conversation(convId, "", "");
		
		MessegeGroup msgGrp = new MessegeGroup();
		msgGrp.setJoinedDatabase(currentSaveTime);
		msgGrp.setLeftDatabase(null);
		msgGrp.setUser(user);
		
		msgGrp.setConversation(conv);
		
		
		msgGrpRepo.save(msgGrp);
	}

	public List<MessegeGroup> findByUserid(int userid) {
		List<MessegeGroup> msgGrp =  new ArrayList<>();
		msgGrpRepo.findByUserId(userid).forEach(msgGrp::add);;
		
		return msgGrp;
	}

	public List<UserReadDto> findUserConvId(int convid) {
		List<UserReadDto> users = new ArrayList<>();
		List<MessegeGroup> msggrp = msgGrpRepo.findByConversationId(convid);
		for(MessegeGroup e : msggrp) {
			User u =  e.getUser();
			users.add(new UserReadDto(u.getId(), u.getFname(), u.getLname()));
		}
		return users;
	}
}
