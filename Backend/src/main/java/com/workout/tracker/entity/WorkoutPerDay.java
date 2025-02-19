package com.workout.tracker.entity;

import com.workout.tracker.model.DayOfWeek;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class WorkoutPerDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayOfWeek dayOfWeek;

    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @OneToMany(mappedBy = "workoutPerDay", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Exercise> exercises;
}