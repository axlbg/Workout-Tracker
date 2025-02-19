package com.workout.tracker.dto;

import com.workout.tracker.model.DayOfWeek;
import lombok.Data;

import java.util.List;

@Data
public class WorkoutPerDayDto {
    private Long id;
    private DayOfWeek dayOfWeek;
    private Long workoutId;
    private List<ExerciseDto> exercises;
}