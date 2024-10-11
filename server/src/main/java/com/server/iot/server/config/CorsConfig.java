package com.server.iot.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configurer class for configuring cors.
 */
@Configuration
public class CorsConfig  {

    /**
     * CORS must be processed before Spring Security, because the pre-flight request does not contain any cookies (that is, the JSESSIONID).
     * If the request does not contain any cookies and Spring Security is first,
     * the request determines that the user is not authenticated (since there are no cookies in the request) and rejects it.
     * @return a cors mapping to the front-end side for 4 main http methods.
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
                        .allowedOrigins("http://localhost:5173", "http://localhost");

            }
        };
    }
}