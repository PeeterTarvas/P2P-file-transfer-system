package com.server.iot.server.config.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.security.Key;

/**
 * Jwt token provider is the main class responsible for providing a jwt token.
 */
@Setter
@Getter
@Service
@AllArgsConstructor
public class JwtTokenProvider {

    private JwtConfig jwtConfig;


    /**
     * Method that controls if jwt token is valid.
     * @param token to be controlled.
     * @param username  of the user who has provided the token.
     * @return true if token is valid.
     */
    public boolean isValid(String token, String username) {
        return getUsernameFormToken(token).equals(username) && hasNotExpired(token);


    }

    /**
     * Generate token using the subject, currently it is used to generate a token using the users username of the user.
     * Uses HS512 algorithm with the secret to sign the token.
     * @param subject that the token uses for instance the username.
     * @return a newly generate jwt(new token).
     */
    public String generateToken(String subject) {
        return Jwts.builder()
                .subject(subject)
                .claims(new HashMap<>())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtConfig.getDurationInMS()))
                .signWith(SignatureAlgorithm.HS512, jwtConfig.getKey())
                .compact();

    }

    /**
     * Provides the username inside the token.
     * This is done by decrypting the token with the secret key in the application.
     * This is used for token validation.
     * @param token that we want to get the username form.
     * @return username provided with the token.
     */
    public String getUsernameFormToken(String token) {
        return Jwts.parser()
                .verifyWith(jwtConfig.getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    /**
     * Gets if the token has expired. Decrypts the token with the secret key.
     * @param token that we want to get the expired date from.
     * @return true if it hasn't expired and false if it has.
     */
    public boolean hasNotExpired(String token) {
        Date date =  Jwts.parser()
                .verifyWith(jwtConfig.getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
        return date.after(new Date());
    }

}
