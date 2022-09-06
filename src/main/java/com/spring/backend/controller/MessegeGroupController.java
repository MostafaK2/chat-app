package com.spring.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.backend.dto.UserReadDto;
import com.spring.backend.model.MessegeGroup;
import com.spring.backend.model.User;
import com.spring.backend.service.MessegeGroupService;


@RestController
@RequestMapping("api/v1")
public class MessegeGroupController {
	
	@Autowired
	MessegeGroupService msgServ;
	
	@RequestMapping("messegegroups")
	
	public List<MessegeGroup> getAllMessegeGroup(){
		return msgServ.getAllMessegeGroup();
	}
	
	@RequestMapping("user/{userid}/messegegroups")
	public List<MessegeGroup> getGroupsByUserId(@PathVariable int userid){
		
		return msgServ.findByUserid(userid);
	}
	
	// test  method
	@RequestMapping("conversation/{convid}/users")
	public List<UserReadDto> getUsersByConversationId(@PathVariable int convid){
		return msgServ.findUserConvId(convid);
	}
	
	@RequestMapping(method = RequestMethod.POST,value="user/{userid}/conversation/{convid}/messegegroups")
	public void addGroupMember(@PathVariable int userid, @PathVariable int convid) {
		msgServ.addGroupMember(userid, convid);	
	}
}
