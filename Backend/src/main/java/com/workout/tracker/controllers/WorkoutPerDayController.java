package com.workout.tracker.controllers;

import com.workout.tracker.dto.WorkoutPerDayDto;
import com.workout.tracker.entity.WorkoutPerDay;
import com.workout.tracker.services.WorkoutPerDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workoutperday")
public class WorkoutPerDayController {
    @Autowired
    private WorkoutPerDayService workoutPerDayService;

    @PostMapping
    public WorkoutPerDayDto createWorkoutPerDay (@RequestBody WorkoutPerDayDto workoutPerDayDto)
    {
        return workoutPerDayService.createWorkoutPerDay(workoutPerDayDto);
    }
}
