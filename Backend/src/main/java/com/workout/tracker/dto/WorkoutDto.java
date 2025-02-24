package com.workout.tracker.dto;

import lombok.Data;

import java.util.List;

@Data
public class WorkoutDto {
    private Long id;
    private String name;
    private Integer icon;
    private List<WorkoutPerDayDto> workoutPerDays;
}
