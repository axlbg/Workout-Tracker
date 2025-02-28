package com.workout.tracker.controllers;

import com.workout.tracker.dto.CreateWorkoutRequest;
import com.workout.tracker.dto.WorkoutDto;
import com.workout.tracker.entity.Workout;
import com.workout.tracker.services.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout")
@CrossOrigin(origins = "http://localhost:4200")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    @PostMapping
    public WorkoutDto createWorkout(@RequestHeader("Authorization") String token, @RequestBody CreateWorkoutRequest workoutRequest)
    {
        return workoutService.createWorkout(token,workoutRequest);
    }

    @GetMapping
    public List<WorkoutDto> getAllWorkouts() {
        return workoutService.findAllWorkouts();
    }
}
