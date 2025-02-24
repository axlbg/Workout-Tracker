package com.workout.tracker.repository;

import com.workout.tracker.entity.WorkoutPerDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutPerDayRepository extends JpaRepository<WorkoutPerDay, Long> {
    List<WorkoutPerDay> findByDate(LocalDate date);
}
