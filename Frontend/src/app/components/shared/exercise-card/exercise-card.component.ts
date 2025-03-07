import { Component, Inject, Input, output } from '@angular/core';
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
  @Input({ required: false }) deleteable: boolean = false;
  onClickEditExercise = output<Exercise>();
  onClickDeleteExercise = output<Exercise>();

  constructor(public apiWorkoutService: ApiWorkoutService) {}

  toggleCompletion(exercise: Exercise): void {
    if (exercise.id != null) {
      exercise.completed = !exercise.completed;
      this.updateExercise(exercise.id, exercise.completed);
    }
  }

  editExercise(event: Event, exercise: Exercise): void {
    event.stopPropagation(); // stop propagation of event to DOM (to not click completed)
    this.onClickEditExercise.emit(exercise);
  }

  updateExercise(id: number, completed: boolean): void {
    this.apiWorkoutService.updateExerciseCompleted(id, completed).subscribe();
  }

  deleteExercise(exercise: Exercise) {
    this.onClickDeleteExercise.emit(exercise);
  }
}
