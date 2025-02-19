package com.workout.tracker.services;

import com.workout.tracker.dto.ExerciseDto;
import com.workout.tracker.dto.WorkoutPerDayDto;
import com.workout.tracker.entity.Exercise;
import com.workout.tracker.entity.Workout;
import com.workout.tracker.entity.WorkoutPerDay;
import com.workout.tracker.exception.ResourceNotFoundException;
import com.workout.tracker.mapper.WorkoutMapper;
import com.workout.tracker.repository.WorkoutPerDayRepository;
import com.workout.tracker.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutPerDayService {
    @Autowired
    private WorkoutRepository workoutRepository;
    @Autowired
    private WorkoutPerDayRepository workoutPerDayRepository;

    public WorkoutPerDayDto createWorkoutPerDay(WorkoutPerDayDto dto) {
        final long workoutId = dto.getWorkoutId();
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Workout not found with id: " + workoutId));

        WorkoutPerDay workoutPerDay = new WorkoutPerDay();
        workoutPerDay.setDayOfWeek(dto.getDayOfWeek());
        workoutPerDay.setWorkout(workout);
        workoutPerDay.setExercises(new ArrayList<>());

        workout.getWorkoutPerDays().add(workoutPerDay);

        return WorkoutMapper.toWorkoutPerDayDto(workoutPerDayRepository.save(workoutPerDay));
    }

}
