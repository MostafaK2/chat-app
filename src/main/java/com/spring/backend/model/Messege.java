package com.spring.backend.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="MESSEGE_DATA")
public class Messege {
	


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column
	private int fromuser;
	
	@Column
	private String messegeTexts;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date sentDatetime;
	
	@ManyToOne
	@JoinColumn(name = "conversation_id")
	@JsonIgnore
	private Conversation conversation;
	
	public  Messege() {
		
	}
	
	public Messege(int id, int fromuser, String messegeTexts, Date sentDatetime, Conversation conversation) {
		super();
		this.id = id;
		this.fromuser = fromuser;
		this.messegeTexts = messegeTexts;
		this.sentDatetime = sentDatetime;
		this.conversation = conversation;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

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

	public Conversation getConversation() {
		return conversation;
	}

	public void setConversation(Conversation conversation) {
		this.conversation = conversation;
	}

}
