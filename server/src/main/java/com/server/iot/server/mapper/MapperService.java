package com.server.iot.server.mapper;

import com.server.iot.server.address.AddressDbo;
import com.server.iot.server.file.FileAvailabilityDbo;
import com.server.iot.server.file.FileDbo;
import com.server.iot.server.file.FileDto;
import com.server.iot.server.user.dtos.LoginRequestDto;
import com.server.iot.server.user.dtos.LoginResponseDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import com.server.iot.server.user.UserDbo;
import com.server.iot.server.user.dtos.UserDto;

import java.time.LocalDateTime;

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
                .peerId(userDto.getPeerId())
                .build();
    }

    /**
     * Convert from UserDbo to UserDto.
     */
    public UserDto convertToUserDto(@NotNull UserDbo userDbo) {
        return new UserDto(userDbo.getUsername(), userDbo.getPassword(), null, userDbo.getPeerId());
    }

    public AddressDbo convertToAddressDbo(@Valid LoginRequestDto loginRequestDto, UserDbo userDbo) {
        return AddressDbo.builder()
                .ip(loginRequestDto.getIpAddress())
                .port(loginRequestDto.getPort())
                .userId(userDbo.getUserId())
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

    public FileDbo convertToFileDbo(@Valid FileDto fileDto) {
        return FileDbo.builder()
                .name(fileDto.getName())
                .size(fileDto.getSize())
                .checksum("")
                .addedTimestamp(LocalDateTime.now())
                .build();
    }

    public FileAvailabilityDbo fileAvailabilityDbo(@Valid FileDbo fileDbo, Long userId) {
        return FileAvailabilityDbo.builder()
                .fileId(fileDbo.getId())
                .userId(userId)
                .available(true)
                .build();
    }



}
