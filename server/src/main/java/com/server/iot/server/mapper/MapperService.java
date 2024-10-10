package com.server.iot.server.mapper;

import com.server.iot.server.address.AddressDbo;
import com.server.iot.server.user.dtos.LoginRequestDto;
import com.server.iot.server.user.dtos.LoginResponseDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import com.server.iot.server.user.UserDbo;
import com.server.iot.server.user.dtos.UserDto;

/**
 * This class is for conversion methods, i.e. convert from dto to dbo or vice versa.
 */
@Service
public class MapperService {


    /**
     * Convert from UserDto to UserDbo.
     */
    public UserDbo convertToUserDbo(@Valid UserDto userDto) {
        return UserDbo.builder()
                .username(userDto.getUsername())
                .password(userDto.getPassword())
                .build();
    }

    /**
     * Convert from UserDbo to UserDto.
     */
    public UserDto convertToUserDto(@NotNull UserDbo userDbo) {
        return new UserDto(userDbo.getUsername(), userDbo.getPassword(), null);
    }

    public AddressDbo convertToAddressDbo(@Valid LoginRequestDto loginRequestDto, UserDbo userDbo) {
        return AddressDbo.builder()
                .ip(loginRequestDto.getIpAddress())
                .port(loginRequestDto.getPort())
                .userId(userDbo)
                .build();
    }


    public LoginResponseDto convertToLoginResponseDto(UserDto userDto, AddressDbo addressDbo, String token) {
        return LoginResponseDto.builder()
                .username(userDto.getUsername())
                .token(token)
                .ip(addressDbo.getIp())
                .port(addressDbo.getPort())
                .build();
    }


}
