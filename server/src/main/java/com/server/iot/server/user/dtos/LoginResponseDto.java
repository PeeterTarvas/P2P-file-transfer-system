package com.server.iot.server.user.dtos;


import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * This object is for sending the login response between the front-end and back-end,
 * it is the response that is sent when the user logs-in.
 */
@Setter
@Getter
@ToString
@Builder
public class LoginResponseDto {

    @NotBlank
    private String ip;
    @NotBlank
    private String port;
    @NotBlank
    private String username;
    @NotBlank
    private String token;
    public LoginResponseDto(String username, String token) {
        this.username = username;
        this.token = token;
    }
}
