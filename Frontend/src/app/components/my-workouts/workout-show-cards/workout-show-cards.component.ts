import { Component, Input } from '@angular/core';
import { Workout } from '../../../class/workout';
import { ExerciseCardComponent } from '../../shared/exercise-card/exercise-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-show-cards',
  standalone: true,
  imports: [ExerciseCardComponent, CommonModule],
  templateUrl: './workout-show-cards.component.html',
  styleUrl: './workout-show-cards.component.css',
})
export class WorkoutShowCardsComponent {
  @Input({ required: true, alias: 'workoutToShow' }) workout!: Workout;
}
