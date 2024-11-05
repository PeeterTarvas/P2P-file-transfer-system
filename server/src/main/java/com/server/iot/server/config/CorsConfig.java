package com.server.iot.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletRequest;

/**
 * Configurer class for configuring CORS dynamically based on the request's Origin header.
 */
@Configuration
public class CorsConfig {

    /**
     * Configures CORS dynamically based on the request's Origin header.
     *
     * @return WebMvcConfigurer
     */
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true)
                        .allowedHeaders("*")
                        .exposedHeaders("*")
                        .allowedOriginPatterns("*");
            }
        };
    }
}