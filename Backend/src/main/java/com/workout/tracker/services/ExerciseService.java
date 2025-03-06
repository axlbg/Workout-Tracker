package com.workout.tracker.services;

import com.workout.tracker.dto.ExerciseDto;
import com.workout.tracker.entity.Exercise;
import com.workout.tracker.entity.WorkoutPerDay;
import com.workout.tracker.exception.ResourceNotFoundException;
import com.workout.tracker.mapper.WorkoutMapper;
import com.workout.tracker.repository.ExerciseRepository;
import com.workout.tracker.repository.WorkoutPerDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private WorkoutPerDayRepository workoutPerDayRepository;

    public ExerciseDto createExercise(ExerciseDto exerciseDto) {
        final Long perDayId = exerciseDto.getWorkoutPerDayId();
        WorkoutPerDay workoutPerDay = workoutPerDayRepository.findById(perDayId)
                .orElseThrow(() -> new ResourceNotFoundException("WorkoutPerDay not found with id: " + perDayId));

        Exercise exercise = new Exercise();
        exercise.setName(exerciseDto.getName());
        exercise.setSets(exerciseDto.getSets());
        exercise.setReps(exerciseDto.getReps());
        exercise.setWeight(exerciseDto.getWeight());
        exercise.setRir(exerciseDto.getRir());
        exercise.setCompleted(exerciseDto.isCompleted());
        exercise.setMuscleGroup(exerciseDto.getMuscleGroup());
        exercise.setWorkoutPerDay(workoutPerDay);

        workoutPerDay.getExercises().add(exercise);

        return WorkoutMapper.toExerciseDto(exerciseRepository.save(exercise));
    }

    public ExerciseDto updateExercise(Long id, ExerciseDto exerciseDto) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));

        if (exerciseDto.getName() != null) {
        exercise.setName(exerciseDto.getName());
        }
        if (exerciseDto.getSets() != null) {
        exercise.setSets(exerciseDto.getSets());
        }
        if (exerciseDto.getReps() != null) {
        exercise.setReps(exerciseDto.getReps());
        }
        if (exerciseDto.getWeight() != null) {
        exercise.setWeight(exerciseDto.getWeight());
        }
        if (exerciseDto.getRir() != null) {
        exercise.setRir(exerciseDto.getRir());
        }
        if (exerciseDto.getMuscleGroup() != null) {
        exercise.setMuscleGroup(exerciseDto.getMuscleGroup());
        }
        if (exerciseDto.getWorkoutPerDayId() != null) {
            WorkoutPerDay workoutPerDay = workoutPerDayRepository.findById(exerciseDto.getWorkoutPerDayId())
                    .orElseThrow(() -> new ResourceNotFoundException("WorkoutPerDay not found with id: " + exerciseDto.getWorkoutPerDayId()));
            exercise.setWorkoutPerDay(workoutPerDay);
        }

        return WorkoutMapper.toExerciseDto(exerciseRepository.save(exercise));
    }


    public ExerciseDto updateExerciseCompleted(Long id, boolean completed) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));

        exercise.setCompleted(completed);

        return WorkoutMapper.toExerciseDto(exerciseRepository.save(exercise));
    }
}