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
        dto.setDate(workoutPerDay.getDate());
        dto.setDayOfWeek(workoutPerDay.getDate().getDayOfWeek());
        dto.setWorkoutId(workoutPerDay.getWorkout().getId());

        if (workoutPerDay.getExercises() != null) {
            List<ExerciseDto> exerciseDtoList = workoutPerDay.getExercises().stream()
                    .map(WorkoutMapper::toExerciseDto)
                    .collect(Collectors.toList());
            dto.setExercises(exerciseDtoList);
        }

        return dto;
    }

    public static WorkoutPerDay toWorkoutPerDay(WorkoutPerDayDto dto, Workout workout) {
        WorkoutPerDay workoutPerDay = new WorkoutPerDay();
        workoutPerDay.setDate(dto.getDate());
        workoutPerDay.setWorkout(workout);

        if (dto.getExercises() != null) {
            List<Exercise> exercises = dto.getExercises().stream()
                    .map(ex -> WorkoutMapper.toExercise(ex, workoutPerDay))
                    .collect(Collectors.toList());
            workoutPerDay.setExercises(exercises);
        }

        return workoutPerDay;
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

    public static Exercise toExercise(ExerciseDto dto, WorkoutPerDay workoutPerDay) {
        Exercise exercise = new Exercise();
        exercise.setName(dto.getName());
        exercise.setSets(dto.getSets());
        exercise.setReps(dto.getReps());
        exercise.setWeight(dto.getWeight());
        exercise.setRir(dto.getRir());
        exercise.setCompleted(dto.isCompleted());
        exercise.setMuscleGroup(dto.getMuscleGroup());
        exercise.setWorkoutPerDay(workoutPerDay);

        return exercise;
    }

}