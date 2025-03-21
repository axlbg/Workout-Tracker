package com.workout.tracker.repository;

import com.workout.tracker.entity.Workout;
import com.workout.tracker.security.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository <Workout, Long> {
    List<Workout> findByUser(UserEntity user);
}
