package com.workout.tracker.repository;

import com.workout.tracker.entity.Exercise;
import com.workout.tracker.model.MuscleGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByMuscleGroup(MuscleGroup MuscleGroup);
}
