package com.workout.tracker.dto;

import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Data
public class CreateWorkoutRequest {
    private String name;
    private Integer icon;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<DayOfWeek> daysOfWeek;
    private List<WorkoutPerDayDto> workoutPerDays;
}