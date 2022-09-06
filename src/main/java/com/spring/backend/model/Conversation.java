package com.spring.backend.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="CONVERSATION_DATA")
public class Conversation {


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String conversationName;

	@Column 
	private String conversationType;
	
	@OneToMany(mappedBy="conversation")
	private List<Messege> messeges;
	
	@OneToMany(mappedBy="conversation")
	private List<MessegeGroup> messegeGroups;
	
	public Conversation() {
		
	}
	
	public Conversation(int id, String conversationName, String conversationType) {
		super();
		this.id = id;
		this.conversationName = conversationName;
		this.conversationType = conversationType;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getConversationName() {
		return conversationName;
	}

	public void setConversationName(String conversationName) {
		this.conversationName = conversationName;
	}

	public String getConversationType() {
		return conversationType;
	}

	public void setConversationType(String conversationType) {
		this.conversationType = conversationType;
	}

	public List<Messege> getMesseges() {
		return messeges;
	}

	public void setMesseges(List<Messege> messeges) {
		this.messeges = messeges;
	}

	public List<MessegeGroup> getMessegeGroups() {
		return messegeGroups;
	}

	public void setMessegeGroups(List<MessegeGroup> messegeGroups) {
		this.messegeGroups = messegeGroups;
	}
}
