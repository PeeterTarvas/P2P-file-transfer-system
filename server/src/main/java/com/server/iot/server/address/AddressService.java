package com.server.iot.server.address;

import com.server.iot.server.user.dtos.LoginRequestDto;
import com.server.iot.server.user.UserDbo;
import com.server.iot.server.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class AddressService {


    private final AddressRepository addressRepository;
    private final UserRepository userRepository;


    private void saveUserIp(LoginRequestDto loginRequestDto) {
        Optional<UserDbo> user = userRepository.getUserDboByUsername(loginRequestDto.getUsername());
        if (user.isPresent()) {
            UserDbo userDbo = user.get();

        }

    }



}
