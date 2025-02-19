package com.workout.tracker.repository;

import com.workout.tracker.entity.WorkoutPerDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutPerDayRepository extends JpaRepository<WorkoutPerDay, Long> {
}
