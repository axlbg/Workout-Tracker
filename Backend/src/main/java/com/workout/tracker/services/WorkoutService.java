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
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.workout.tracker.security.services.AuthService;

@Service
public class WorkoutService {

    @Autowired
    private AuthService authService;
    @Autowired
    private WorkoutRepository workoutRepository;
    @Autowired
    private UserRepository userRepository;

    public WorkoutDto createWorkout(@RequestHeader("Authorization") String token, WorkoutDto dto) {
        String jwtToken = token.replace("Bearer ", "");
        UserEntity user = authService.getUserFromToken(jwtToken);

        Workout workout = new Workout();
        workout.setUser(user);
        workout.setName(dto.getName());

        if (dto.getWorkoutPerDays() == null || dto.getWorkoutPerDays().isEmpty()) {
            workout.setWorkoutPerDays(new ArrayList<>());
        }
        else {
            List<WorkoutPerDay> workoutPerDayList = dto.getWorkoutPerDays().stream()
                    .map(wpdDto -> WorkoutMapper.toWorkoutPerDay(wpdDto, workout))
                    .collect(Collectors.toList());
            workout.setWorkoutPerDays(workoutPerDayList);
        }

        return WorkoutMapper.toWorkoutDto(workoutRepository.save(workout));
    }

    public List<WorkoutDto> findAllWorkouts() {
        List<Workout> workoutList = workoutRepository.findAll();

        return workoutList.stream()
                .map(WorkoutMapper::toWorkoutDto)
                .collect(Collectors.toList());
    }

}
