package com.spring.backend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class MessegeGroup {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int messegeGroupId;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column
	private Date joinedDatabase;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column
	private Date leftDatabase;
		
	@JoinColumn
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	private User user;
	
	@JoinColumn
	@ManyToOne
	@JsonIgnore
	private Conversation conversation;
	

	public int getMessegeGroupId() {
		return messegeGroupId;
	}

	public void setMessegeGroupId(int messegeGroupId) {
		this.messegeGroupId = messegeGroupId;
	}

	public Date getJoinedDatabase() {
		return joinedDatabase;
	}

	public void setJoinedDatabase(Date joinedDatabase) {
		this.joinedDatabase = joinedDatabase;
	}

	public Date getLeftDatabase() {
		return leftDatabase;
	}

	public void setLeftDatabase(Date leftDatabase) {
		this.leftDatabase = leftDatabase;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Conversation getConversation() {
		return conversation;
	}

	public void setConversation(Conversation conversation) {
		this.conversation = conversation;
	}
	
	
}
