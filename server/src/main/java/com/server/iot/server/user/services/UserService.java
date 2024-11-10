package com.server.iot.server.user.services;


import com.server.iot.server.address.AddressDbo;
import com.server.iot.server.address.AddressService;
import com.server.iot.server.config.security.JwtTokenProvider;
import com.server.iot.server.group.Group;
import com.server.iot.server.group.GroupRepository;
import com.server.iot.server.mapper.MapperService;
import com.server.iot.server.user.UserDbo;
import com.server.iot.server.user.UserRepository;
import com.server.iot.server.user.dtos.LoginRequestDto;
import com.server.iot.server.user.dtos.LoginResponseDto;
import com.server.iot.server.user.dtos.UserDto;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

/**
 * Service class for all user related activities - login and register.
 */
@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final MapperService mapperService;
    private final AddressService addressService;

    private final GroupRepository groupRepository;


    /**
     * This method registers the users account by:
     *  - checking if the users details are valid
     *  - encoding their password
     *  - save the account
     * @param userDto with the details of the account.
     * @throws Error if user already exists(username already exists) or their data is invalid.
     */
    @Transactional()
    public void register(@Valid UserDto userDto) throws Error {
            userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
            UserDbo userDbo =
                    mapperService.convertToUserDbo(userDto);
            try {
                userRepository.saveAndFlush(userDbo);
            } catch (Exception e) {
                throw new Error(e);
            }
    }

    /**
     * This method is for users to login to their account.
     * Steps are:
     * - it validates login details with isValidUser method.
     * - if it is valid then authenticate the user by their password, with authentication manager
     * - get the users details object by with the principal - user details - object returned by the authentication
     * - Generate the token with the users token
     * @param loginRequestDto with the account details of the user.
     * @return a data transfer object that contains the accounts username and jwt.
     * @throws Error if password or username is incorrect or when their data isn't valid.
     */
    @Transactional()
    public LoginResponseDto login(@Valid LoginRequestDto loginRequestDto) throws Error {
        try {
            Authentication authentication;
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDto.getUsername(), loginRequestDto.getPassword()));
            UserDto principle = (UserDto) authentication.getPrincipal();
            String token = jwtTokenProvider.generateToken(principle.getUsername());
            addressService.saveUserIp(loginRequestDto);
            UserDbo userDbo = userRepository.getUserDboByUsername(principle.getUsername()).get();
            AddressDbo addressDbo =  addressService.getAddressByUsername(List.of(userDbo.getUserId())).getFirst();
            return mapperService.convertToLoginResponseDto(principle, addressDbo, token);
        } catch (Exception e) {
            throw new Error(e);
        }

    }

    public List<UserDbo> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserDbo> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<UserDbo> getUserByUsername(String username) {
        return userRepository.getUserDboByUsername(username);
    }

}
