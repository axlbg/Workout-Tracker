package com.workout.tracker.dto;

import com.workout.tracker.model.MuscleGroup;
import lombok.Data;

@Data
public class ExerciseDto {
    private Long id;
    private String name;
    private Integer sets;
    private Integer reps;
    private Double weight;
    private Integer rir;
    private boolean completed;
    private Long workoutPerDayId;
    private MuscleGroup muscleGroup;
}