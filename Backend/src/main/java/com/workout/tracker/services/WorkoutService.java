package com.workout.tracker.services;

import com.workout.tracker.dto.CreateWorkoutRequest;
import com.workout.tracker.dto.WorkoutDto;
import com.workout.tracker.entity.Exercise;
import com.workout.tracker.entity.Workout;
import com.workout.tracker.entity.WorkoutPerDay;
import com.workout.tracker.mapper.WorkoutMapper;
import com.workout.tracker.repository.WorkoutRepository;
import com.workout.tracker.security.entity.UserEntity;
import com.workout.tracker.security.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import com.workout.tracker.security.services.AuthService;

import java.time.LocalDate;


@Service
public class WorkoutService {

    @Autowired
    private AuthService authService;
    @Autowired
    private WorkoutRepository workoutRepository;
    @Autowired
    private UserRepository userRepository;

    public WorkoutDto createWorkout(@RequestHeader("Authorization") String token, CreateWorkoutRequest request) {
        String jwtToken = token.replace("Bearer ", "");
        UserEntity user = authService.getUserFromToken(jwtToken);

        Workout workout = new Workout();
        workout.setUser(user);
        workout.setName(request.getName());
        workout.setIcon(request.getIcon());

        List<WorkoutPerDay> workoutPerDayList = new ArrayList<>();
        if (    request.getWorkoutPerDays() != null && !request.getWorkoutPerDays().isEmpty()
                && request.getStartDate() != null && request.getEndDate() != null
                && request.getDaysOfWeek() != null && !request.getDaysOfWeek().isEmpty()
        ) {
            LocalDate currentDate = request.getStartDate();
            while (!currentDate.isAfter(request.getEndDate())) { // startDate to EndDate
                if (request.getDaysOfWeek().contains(currentDate.getDayOfWeek())) { // check if day is selected
                    WorkoutPerDay workoutPerDay = new WorkoutPerDay();
                    workoutPerDay.setDate(currentDate);
                    workoutPerDay.setWorkout(workout);


                    LocalDate finalCurrentDate = currentDate;
                    List<Exercise> exercises = request.getWorkoutPerDays().stream()
                            .filter(wpd -> wpd.getDayOfWeek() == finalCurrentDate.getDayOfWeek())
                            .flatMap(wpd -> wpd.getExercises().stream())
                            .map(exDto -> WorkoutMapper.toExercise(exDto, workoutPerDay))
                            .collect(Collectors.toList());

                    workoutPerDay.setExercises(exercises);

                    workoutPerDayList.add(workoutPerDay);
                }
                currentDate = currentDate.plusDays(1); // go to next day
            }

        }

        workout.setWorkoutPerDays(workoutPerDayList);

        return WorkoutMapper.toWorkoutDto(workoutRepository.save(workout));
    }

    public List<WorkoutDto> findByUser(@RequestHeader("Authorization") String token){
        String jwtToken = token.replace("Bearer ", "");
        UserEntity user = authService.getUserFromToken(jwtToken);
        List<Workout> workoutList = workoutRepository.findByUser(user);

        return workoutList.stream()
                .map(WorkoutMapper::toWorkoutDto)
                .collect(Collectors.toList());
    }

    public List<WorkoutDto> findAllWorkouts() {
        List<Workout> workoutList = workoutRepository.findAll();

        return workoutList.stream()
                .map(WorkoutMapper::toWorkoutDto)
                .collect(Collectors.toList());
    }

    private List<LocalDate> generateDates(LocalDate startDate, LocalDate endDate, List<DayOfWeek> daysOfWeek) {
        List<LocalDate> dates = new ArrayList<>();

        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) { // startDate to EndDate
            if (daysOfWeek.contains(currentDate.getDayOfWeek())) { // check if day is selected
                dates.add(currentDate);
            }
            currentDate = currentDate.plusDays(1); // go to next day
        }

        return dates;
    }
}
