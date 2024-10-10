package com.server.iot.server.user.dtos;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Collections;

/**
 * This object is for sending the users account details between the front-end and back-end.
 */
@Setter
@Getter
@ToString
public class UserDto extends User {

    private String userId;
    @NotBlank
    private String username;
    @ToString.Exclude
    @NotBlank
    private String password;

    public UserDto(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, Collections.emptyList());
        this.username = username;
        this.password = password;
    }
}
