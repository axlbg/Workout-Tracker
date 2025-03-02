import { Component, Inject, Input } from '@angular/core';
import { Exercise } from '../../../class/exercise';
import { CommonModule } from '@angular/common';
import { ApiWorkoutService } from '../../../services/api-workout.service';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.css',
})
export class ExerciseCardComponent {
  @Input({ required: true }) exercise!: Exercise;
  @Input({ required: false }) toggleOnCard: boolean = true;

  constructor(public apiWorkoutService: ApiWorkoutService) {}

  toggleCompletion(exercise: Exercise): void {
    exercise.completed = !exercise.completed;
    this.updateExercise(exercise, exercise.completed);
  }

  editExercise(event: Event, exercise: Exercise): void {
    event.stopPropagation(); // stop propagation of event to DOM
    // edit every attribute
    // soon...
  }

  updateExercise(exercise: Exercise, completed: boolean): void {
    this.apiWorkoutService.updateExercisesCompleted(exercise, completed);
  }
}
