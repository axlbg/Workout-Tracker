import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutPerDay } from '../../class/workoutPerDay';
import { DayOfWeekPipe } from '../../pipes/day-of-week.pipe';
import { ButtonModule } from 'primeng/button';
import { Exercise } from '../../class/exercise';

@Component({
  selector: 'app-show-daily',
  imports: [FormsModule, CommonModule, DayOfWeekPipe, ButtonModule],
  templateUrl: './show-daily.component.html',
  styleUrl: './show-daily.component.css',
})
export class ShowDailyComponent {
  @Input({ required: true }) day!: WorkoutPerDay | null;

  toggleCompletion(exercise: Exercise): void {
    exercise.completed = !exercise.completed;
  }

  editExercise(event: Event, exercise: Exercise): any {
    event.stopPropagation(); // stop propagation of event to DOM
  }
}
