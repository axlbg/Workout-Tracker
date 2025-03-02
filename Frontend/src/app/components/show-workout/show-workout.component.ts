import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../class/workout';
import { ExerciseCardComponent } from '../exercise-card/exercise-card.component';

@Component({
  selector: 'app-show-workout',
  standalone: true,
  imports: [FormsModule, CommonModule, ExerciseCardComponent],
  templateUrl: './show-workout.component.html',
  styleUrls: ['./show-workout.component.css'],
})
export class ShowWorkoutComponent {
  @Input({ required: true }) workout!: Workout;
}
