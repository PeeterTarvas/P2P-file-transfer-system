package com.server.iot.server.user.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;


@Setter
@Getter
@ToString
public class LoginRequestDto extends UserDto {

    @NotBlank
    private String ipAddress;

    @NotBlank
    private String port;


    public LoginRequestDto(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }
}
