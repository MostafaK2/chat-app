package com.spring.backend.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.spring.backend.repository.UserRepository;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired 
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// it first gets the header
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		// if the header has the token pass it along the filterchain
		// save this as bearer later on
		if(!StringUtils.hasText(header) || (StringUtils.hasText(header) && !header.startsWith("Token "))) {
			filterChain.doFilter(request, response);
			return;
		}
		
		
		final String token = header.split(" ")[1].trim();
		
		//get the User from findByUsername and leveraging getUsernameFromToken
		UserDetails userDetails = userRepository.findByUsername(jwtUtil.getUsernameFromToken(token)).orElse(null);
		
		// validates the token
		if(!jwtUtil.validateToken(token, userDetails)) {
			filterChain.doFilter(request, response);
		}
		
		
		// validates using simple username and password
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            userDetails, null,
            userDetails == null ?
                new ArrayList<>() : userDetails.getAuthorities()
        );

	    authentication.setDetails(
	        new WebAuthenticationDetailsSource().buildDetails(request)
	    );
	    
	    // authentication happens and the user is now valid
	    SecurityContextHolder.getContext().setAuthentication(authentication);
	    filterChain.doFilter(request, response);
			
		
		
		
		
	}
}
