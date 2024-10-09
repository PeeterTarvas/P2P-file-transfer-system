package com.server.iot.server.mapper;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import com.server.iot.server.user.UserDbo;
import com.server.iot.server.user.UserDto;

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


}
