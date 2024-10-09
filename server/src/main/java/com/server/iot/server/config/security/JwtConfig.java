package com.server.iot.server.config.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

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

    public int getDurationInMS() {
        return durationMin * 60 * 1000;
    }

}
