package com.server.iot.server.user;


import com.server.iot.server.helper.ResponseHandler;
import com.server.iot.server.user.dtos.LoginRequestDto;
import com.server.iot.server.user.dtos.LoginResponseDto;
import com.server.iot.server.user.dtos.UserDto;
import com.server.iot.server.user.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
