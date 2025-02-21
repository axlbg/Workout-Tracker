package com.workout.tracker.services;

import com.workout.tracker.dto.ExerciseDto;
import com.workout.tracker.dto.WorkoutDto;
import com.workout.tracker.dto.WorkoutPerDayDto;
import com.workout.tracker.entity.Exercise;
import com.workout.tracker.entity.Workout;
import com.workout.tracker.entity.WorkoutPerDay;
import com.workout.tracker.exception.ResourceNotFoundException;
import com.workout.tracker.mapper.WorkoutMapper;
import com.workout.tracker.repository.WorkoutRepository;
import com.workout.tracker.security.entity.UserEntity;
import com.workout.tracker.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;
    @Autowired
    private UserRepository userRepository;

    public WorkoutDto createWorkout(@AuthenticationPrincipal UserDetails userDetails, WorkoutDto dto) {
        UserEntity user = userRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid auth"));
       /* final long userId = dto.getUserId();
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));*/

        Workout workout = new Workout();
        workout.setUser(user);
        workout.setName(dto.getName());
        workout.setWorkoutPerDays(new ArrayList<>());

        return WorkoutMapper.toWorkoutDto(workoutRepository.save(workout));
    }

    public List<WorkoutDto> findAllWorkouts() {
        List<Workout> workoutList = workoutRepository.findAll();

        return workoutList.stream()
                .map(WorkoutMapper::toWorkoutDto)
                .collect(Collectors.toList());
    }

}
