package com.server.iot.server.config.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

/**
 * This is the object that configures the jwt duration and secret.
 */
@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "app.jwt")
public class JwtConfig {

    private String secret;
    private int durationMin;

    SecretKey key = Jwts.SIG.HS512.key().build();
    @PostConstruct
    public void init() {key = Keys.secretKeyFor(SignatureAlgorithm.HS512);}


    public int getDurationInMS() {
        return durationMin * 60 * 1000;
    }

}
