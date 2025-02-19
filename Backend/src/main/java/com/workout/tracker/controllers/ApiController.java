package com.workout.tracker.controllers;

import com.workout.tracker.dto.ExerciseDto;
import com.workout.tracker.entity.Exercise;
import com.workout.tracker.security.entity.UserEntity;
import com.workout.tracker.security.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController  {
    @Autowired
    private AuthService authService;

    @GetMapping("/public")
    public String publicEndpoint() {
        return "Hello this is a public endpoint";
    }


    @GetMapping("/protected")
    public String protectedEndpoint() {
        return "Hello this is a protected endpoint";
    }


    @GetMapping("/me")
    public String getCurrentUser(@RequestHeader("Authorization") String token) {
        String jwtToken = token.replace("Bearer ", "");
        UserEntity user = authService.getUserFromToken(jwtToken);
        return "{ user: " +user.getUsername()+ " }";
    }

}
