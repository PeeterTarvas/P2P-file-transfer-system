package com.server.iot.server.user.dtos;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

/**
 * This object is for sending the login response between the front-end and back-end,
 * it is the response that is sent when the user logs-in.
 */
@Data
@ToString
@Builder
@AllArgsConstructor
public class LoginResponseDto {


    @NotBlank
    private String peerId;
    @NotBlank
    private String username;
    @NotBlank
    private String token;

    public LoginResponseDto(String username, String token) {
        this.username = username;
        this.token = token;
    }
}
