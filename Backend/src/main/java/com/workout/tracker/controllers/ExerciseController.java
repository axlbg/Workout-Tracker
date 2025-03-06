package com.workout.tracker.controllers;

import com.workout.tracker.dto.ExerciseDto;
import com.workout.tracker.entity.Exercise;
import com.workout.tracker.services.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @PostMapping
    public ExerciseDto createExercise(@RequestBody ExerciseDto exerciseDto) {
        return exerciseService.createExercise(exerciseDto);
    }

    @PutMapping("/{id}")
    public ExerciseDto updateExercise(@PathVariable Long id, @RequestBody ExerciseDto exerciseDto)
    {
        return exerciseService.updateExercise(id, exerciseDto);
    }

    @PatchMapping("/{id}")
    public ExerciseDto updateExerciseCompleted(@PathVariable Long id, @RequestBody boolean completed)
    {
        return exerciseService.updateExerciseCompleted(id, completed);
    }
}
