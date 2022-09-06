package com.spring.backend.dto;

import java.util.Date;

public class MessegeDto {
	
	private int fromuser;
	private String messegeTexts;
	private Date sentDatetime;	
	private int conversationId;
	
	public int getFromuser() {
		return fromuser;
	}
	public void setFromuser(int fromuser) {
		this.fromuser = fromuser;
	}
	public String getMessegeTexts() {
		return messegeTexts;
	}
	public void setMessegeTexts(String messegeTexts) {
		this.messegeTexts = messegeTexts;
	}
	public Date getSentDatetime() {
		return sentDatetime;
	}
	public void setSentDatetime(Date sentDatetime) {
		this.sentDatetime = sentDatetime;
	}
	public int getConversationId() {
		return conversationId;
	}
	public void setConversationId(int conversationId) {
		this.conversationId = conversationId;
	}
	

}
