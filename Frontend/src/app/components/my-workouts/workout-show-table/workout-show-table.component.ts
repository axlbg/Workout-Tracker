import { Component, Input } from '@angular/core';
import { Workout } from '../../../class/workout';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Exercise, MuscleGroup } from '../../../class/exercise';
import { MuscleGroupPipe } from '../../../pipes/muscle-group.pipe';
import { ButtonModule } from 'primeng/button';
import { DayOfWeek, WorkoutPerDay } from '../../../class/workoutPerDay';

@Component({
  selector: 'app-workout-show-table',
  standalone: true,
  imports: [TableModule, CommonModule, SelectModule, FormsModule, ButtonModule],
  templateUrl: './workout-show-table.component.html',
  styleUrl: './workout-show-table.component.css',
})
export class WorkoutShowTableComponent {
  @Input({ required: true, alias: 'workoutToShow' }) workout!: Workout;

  rowStyle(exercise: Exercise) {
    return {
      'background-color': exercise.completed ? 'green' : '',
    };
  }
}
