package com.spring.backend.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "USER")
public class User implements UserDetails{
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String fname;
	@Column
	private String lname;
	
	@Column
	private String username;
	@Column
	
	private String password;
	
//	@OneToMany(mappedBy = "user")
//	private List<Authority> roles;
	
	@OneToMany(mappedBy = "user")
	private List<MessegeGroup> msgGroups; 
	
	public User() {
		
	}
	
	public User(int id, String fname, String lname, String email) {
		super();
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.username = email;
	}
	
	@Override
	public String getUsername() {
		return username;
	}

	public void setUsername(String email) {
		this.username = email;
	}
	
	@Override
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	
	public List<MessegeGroup> getMsgGroups() {
		return msgGroups;
	}
	public void setMsgGroups(List<MessegeGroup> msgGroups) {
		this.msgGroups = msgGroups;
	}
	
//	public List<Authority> getRoles() {
//		return roles;
//	}
//
//	public void setRoles(List<Authority> roles) {
//		this.roles = roles;
//	}

	// the authority.modal class should be injected here 
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		List<GrantedAuthority> roles =  new ArrayList<>();
		GrantedAuthority ga = new Authority("USER");
		roles.add(ga);
		return roles;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}


	
}
