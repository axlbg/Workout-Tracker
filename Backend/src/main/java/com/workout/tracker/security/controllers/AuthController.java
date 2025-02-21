package com.workout.tracker.security.controllers;

import com.workout.tracker.security.dto.LoginRequest;
import com.workout.tracker.security.dto.SignUpRequest;
import com.workout.tracker.security.entity.UserEntity;
import com.workout.tracker.security.services.AuthService;
import com.workout.tracker.security.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        UserEntity user = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return jwtService.generateToken(user.getUsername());
    }

    @PostMapping("/signup")
    public UserEntity signUp(@RequestBody SignUpRequest signUpRequest) {
        return authService.signUp(signUpRequest.getUsername(), signUpRequest.getPassword());
    }


}