import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../class/workout';

@Component({
  selector: 'app-show-workout',
  imports: [FormsModule, CommonModule],
  templateUrl: './show-workout.component.html',
  styleUrl: './show-workout.component.css',
})
export class ShowWorkoutComponent {
  @Input({ required: true }) workout!: Workout;
}
