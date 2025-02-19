package com.workout.tracker.controllers;

import com.workout.tracker.dto.WorkoutDto;
import com.workout.tracker.entity.Workout;
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
    public WorkoutDto createWorkout(@RequestBody WorkoutDto workoutDto)
    {
        return workoutService.createWorkout(workoutDto);
    }

    @GetMapping
    public List<WorkoutDto> getAllWorkouts() {
        return workoutService.findAllWorkouts();
    }
}
