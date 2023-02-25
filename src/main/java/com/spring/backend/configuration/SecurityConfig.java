package com.spring.backend.configuration;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.spring.backend.util.CustomPasswordEncoder;
import com.spring.backend.util.JwtFilter;


@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private CustomPasswordEncoder customPasswordEncoder;
	
	@Autowired
	private JwtFilter jwtFilter;
	
	// authentication: this authenticates the user 
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// TODO Auto-generated method stub
		auth.userDetailsService(userDetailsService)
		.passwordEncoder(customPasswordEncoder.getPasswordEncoder());
	}
	
	// Authorization
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
        http = http.csrf().disable().cors().disable();
        
        http = http.sessionManagement()
                   .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                   .and();
        
        http = http.exceptionHandling()
                   .authenticationEntryPoint((request, response, ex) -> {
                       response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
                   }).and();
        
//        permits all types of requests.
        http.authorizeRequests()										
        	.antMatchers("/api/v1/users").permitAll()
        	.antMatchers("/api/v1/auth/**").permitAll()
            .anyRequest().permitAll();
        
//        http.requiresChannel()										
//	    	.antMatchers("/api/v1/users").requiresSecure()
//	    	.antMatchers("/api/v1/auth/**").requiresSecure()
//	        .anyRequest().requiresSecure();
        
        
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}
	
	@Override @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
	
	
}
