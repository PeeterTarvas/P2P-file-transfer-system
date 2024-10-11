package com.server.iot.server.config.security;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;


@Setter
@Lazy
@AllArgsConstructor
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION = "Authorization";
    public static final String BEARER_ = "Bearer ";
    private JwtTokenProvider jwtTokenProvider;
    private UserDetailsService userDetails;


    /**
     * Provides the authentication token that the user os authenticated with.
     * Creates a new token, adds the http request to it and then returns the newly generated token.
     */
    public UsernamePasswordAuthenticationToken buildAuthToken(UserDetails userDetails, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        return authenticationToken;
    }

    /**
     * return the username inside a jwt.
     */
    public String getUsername(Optional<String> token) {
        try {
            System.out.printf(token.orElse(String.valueOf(token.isEmpty())));
            return jwtTokenProvider.getUsernameFormToken(token.get());
        } catch (RuntimeException e) {
            return null;
        }
    }

    /**
     * Return a token inside the http request.
     */
    public Optional<String> getToken(HttpServletRequest request) {
        String header = request.getHeader(AUTHORIZATION);
        if (header == null || !header.startsWith(BEARER_)) {
            return Optional.empty();
        }
        return Optional.of(header.substring(BEARER_.length()));
    }

    /**
     * Main filtering method that is responsible for authenticating a request.
     * It firstly gets the token and if it exists then gets the user of that token.
     * After getting that it checks if the user exists then validates the user by:
     *  - checking if the tokens user and the user match,
     *   - if everything is valid then it builds an authentication token and sets the authentication context as the token
     *   so that the user has been authenticated.
     */
    @Override
    public void doFilterInternal(HttpServletRequest request,
                                 jakarta.servlet.http.HttpServletResponse response,
                                 jakarta.servlet.FilterChain filterChain)
            throws jakarta.servlet.ServletException, IOException {
        Optional<String> token = getToken(request);
        if (token.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }
        String username = getUsername(token);
        System.out.printf(username);
        if (username == null) {
            filterChain.doFilter(request, response);
            return;
        }
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails =  this.userDetails.loadUserByUsername(username);
            if (jwtTokenProvider.isValid(token.get(), userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authenticationToken = buildAuthToken(userDetails, request);
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }

}
