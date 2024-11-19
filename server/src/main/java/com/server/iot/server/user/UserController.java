package com.server.iot.server.user;


import com.server.iot.server.file.FileAvaliablilityDto;
import com.server.iot.server.group.Group;
import com.server.iot.server.helper.ResponseHandler;
import com.server.iot.server.user.dtos.LoginRequestDto;
import com.server.iot.server.user.dtos.LoginResponseDto;
import com.server.iot.server.user.dtos.UserDto;
import com.server.iot.server.user.services.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * This is the endpoint controller for all user related logic.
 */
@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {


    private final UserService userService;

    private final ResponseHandler responseHandler;

    @GetMapping("")
    public ResponseEntity<String> getTest() {
        return new ResponseEntity<>("Hello World!", HttpStatus.OK);
    }

    /**
     * This method is the endpoint that is called when the new user wants to register their account.
     * @param userDto that has the account details of the new user.
     * @return a response if the account creation is successful.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserDto userDto) {
        log.info("Register account: " + userDto.toString() + "for user: " + userDto.getUsername());
        this.userService.register(userDto);
        log.info("Registered account: " + userDto.toString() + "for user: " + userDto.getUsername());
        return responseHandler.returnResponse(HttpStatus.CREATED,
                "{\"message\": \"Created: " + userDto.getUsername() + "\"}");
    }

    /**
     * This method enables the user to sign in to their account.
     * @param userDto with the users details of their account.
     * @return the login response if the login is successful, else return an error.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequestDto userDto) {
        log.info("Login to account: " + userDto.toString() + "for user: " + userDto.getUsername());
        LoginResponseDto loginResponseDto =  userService.login(userDto);
        log.info("Login to account success: " + userDto.toString() + "for user: " + userDto.getUsername());
        return responseHandler.returnResponse(HttpStatus.OK, loginResponseDto);
    }

    @GetMapping("/search/{searchTerm}")
    public ResponseEntity<List<UserDto>> getFileAvailabilityByFilename(
            @PathVariable("searchTerm") @NotBlank String searchTerm) {
        log.info("Searching by search term: " + searchTerm);
        List<UserDto> userDtoList = userService.getUsersBySearchTerm(searchTerm);
        log.info("Found users : " + userDtoList);
        return ResponseEntity.ok(userDtoList);
    }

    @GetMapping("/allusers")
    public List<UserDbo> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<UserDbo> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/{username}")
    public Optional<UserDbo> getUserById(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @PostMapping("/{username}/online-status")
    public ResponseEntity<?> updateOnlineStatusByUsername(
            @PathVariable String username, // Expect username as a path variable
            @RequestParam Boolean isOnline) {

        // Log the request details
        log.info("Updating online status for user: " + username + " to " + isOnline);

        // Assuming userService has a method to find a user by username
        boolean isUpdated = userService.updateOnlineStatusByUsername(username, isOnline);

        if (isUpdated) {
            log.info("Online status updated for user: " + username);
            return responseHandler.returnResponse(HttpStatus.OK, "Online status updated successfully.");
        } else {
            // If user not found or some error happens
            log.error("User not found or failed to update online status for: " + username);
            return responseHandler.returnResponse(HttpStatus.NOT_FOUND, "User not found.");
        }
    }



}
