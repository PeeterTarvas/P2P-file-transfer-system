package com.server.iot.server.config.security;



import com.server.iot.server.user.UserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Class for setting the configuration for the back-end security.
 */
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;
    private final RestAuthenticationEntryPoint authenticationEntryPoint;
    private final UserDetailsService userDetailsService;

    /**
     * This method configures the security filter chain for your Spring Security configuration.
     * It adds a jwtRequestFilter in the beginning of the chain, which returns if the user is authenticated or not.
     * The authentication is done by processing JWT in the header of the request.
     * Csrf is disabled at this moment because I felt it went a bit out of scope in this project.
     * Cors are enabled because eof the preflight request cannot access the application without custom cors.
     * The request of the account are permitted to be used by all except for the users data
     * for which the user has to be authenticated as that user.
     *
     * @param http The HttpSecurity object used to configure security filters.
     * @return A SecurityFilterChain that specifies the security rules for various endpoints.
     * @throws Exception If there is an error while configuring security.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling((e) -> e.authenticationEntryPoint(authenticationEntryPoint))
                .build();
    }

    /**
     * @return a password encoder that can be used to encrypt passwords with.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Adds UserDetailsService to the spring boot authentication manager.
     */
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userDetailsService);
    }

    /**
     * Creates an authentication manager getter that can be accessed as a bean in other objects.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }


}
