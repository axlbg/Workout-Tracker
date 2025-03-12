package com.workout.tracker.controllers;

import com.workout.tracker.dto.CreateWorkoutRequest;
import com.workout.tracker.dto.WorkoutDto;
import com.workout.tracker.services.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    @PostMapping
    public WorkoutDto createWorkout(@RequestHeader("Authorization") String token, @RequestBody CreateWorkoutRequest workoutRequest)
    {
        return workoutService.createWorkout(token,workoutRequest);
    }

    @GetMapping
    public List<WorkoutDto> getWorkoutsByUser(@RequestHeader("Authorization") String token) {
        return workoutService.findByUser(token);
    }

//    @GetMapping
//    public List<WorkoutDto> getAllWorkouts() { return workoutService.findAllWorkouts(); }
}
