package com.workout.tracker.entity;

import com.workout.tracker.model.MuscleGroup;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer sets;

    private Integer reps;
    private Double weight;
    private Integer rir;
    private boolean completed;

    @Enumerated(EnumType.STRING)
    private MuscleGroup muscleGroup;

    @ManyToOne
    @JoinColumn(name = "workout_per_day_id", nullable = false)
    private WorkoutPerDay workoutPerDay;

}