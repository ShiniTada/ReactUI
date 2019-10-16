package com.epam.esm.security;

import com.epam.esm.dto.ExceptionDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.session.SessionManagementFilter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  @Bean
  SecurityCorsFilter corsFilter() {
    return new SecurityCorsFilter();
  }

  /** Define URL patterns to enable OAuth2 security */
  @Override
  public void configure(HttpSecurity http) throws Exception {
    http.addFilterBefore(corsFilter(), SessionManagementFilter.class)
            .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .csrf()
        .disable()
        .authorizeRequests()
        .antMatchers("/")
        .permitAll()
        .and()
        .exceptionHandling()
        .authenticationEntryPoint(unauthorizedHandler())
    .and().httpBasic();
  }

  @Bean
  public AuthenticationEntryPoint unauthorizedHandler() {
    return (request, response, ex) -> {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.setContentType(MediaType.APPLICATION_JSON_VALUE);

      ServletOutputStream out = response.getOutputStream();
      ExceptionDto exceptionDto = new ExceptionDto();
      exceptionDto.addMessage("You are not authorized");
      new ObjectMapper().writeValue(out, exceptionDto);
      out.flush();
    };
  }
}
