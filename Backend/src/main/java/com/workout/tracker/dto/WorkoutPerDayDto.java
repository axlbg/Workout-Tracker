package com.workout.tracker.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Data
public class WorkoutPerDayDto {
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    private DayOfWeek dayOfWeek;
    private Long workoutId;
    private List<ExerciseDto> exercises;
}