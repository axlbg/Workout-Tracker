package com.workout.tracker.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.workout.tracker.dto.ExerciseDto;
import com.workout.tracker.dto.WorkoutDto;
import com.workout.tracker.dto.WorkoutPerDayDto;
import com.workout.tracker.entity.Exercise;
import com.workout.tracker.entity.Workout;
import com.workout.tracker.entity.WorkoutPerDay;


public class WorkoutMapper {
    public static WorkoutDto toWorkoutDto(Workout workout) {
        WorkoutDto dto = new WorkoutDto();
        dto.setId(workout.getId());
        dto.setName(workout.getName());
        dto.setUserId(workout.getUser().getId());

        if (workout.getWorkoutPerDays() != null) {
            List<WorkoutPerDayDto> workoutPerDayDtoList = workout.getWorkoutPerDays().stream()
                    .map(WorkoutMapper::toWorkoutPerDayDto)
                    .collect(Collectors.toList());
            dto.setWorkoutPerDays(workoutPerDayDtoList);
        }

        return dto;
    }

    public static WorkoutPerDayDto toWorkoutPerDayDto(WorkoutPerDay workoutPerDay) {
        WorkoutPerDayDto dto = new WorkoutPerDayDto();
        dto.setId(workoutPerDay.getId());
        dto.setDayOfWeek(workoutPerDay.getDayOfWeek());
        dto.setWorkoutId(workoutPerDay.getWorkout().getId());

        if (workoutPerDay.getExercises() != null) {
            List<ExerciseDto> exerciseDtoList = workoutPerDay.getExercises().stream()
                    .map(WorkoutMapper::toExerciseDto)
                    .collect(Collectors.toList());
            dto.setExercises(exerciseDtoList);
        }

        return dto;
    }

    public static ExerciseDto toExerciseDto(Exercise exercise) {
        ExerciseDto dto = new ExerciseDto();
        dto.setId(exercise.getId());
        dto.setName(exercise.getName());
        dto.setSets(exercise.getSets());
        dto.setReps(exercise.getReps());
        dto.setWeight(exercise.getWeight());
        dto.setRir(exercise.getRir());
        dto.setCompleted(exercise.isCompleted());
        dto.setMuscleGroup(exercise.getMuscleGroup());
        dto.setWorkoutPerDayId(exercise.getWorkoutPerDay().getId());
        return dto;
    }
}