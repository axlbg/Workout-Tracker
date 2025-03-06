import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WorkoutPerDay } from '../../../class/workoutPerDay';
import { CardModule } from 'primeng/card';
import { Exercise } from '../../../class/exercise';
import { ExerciseCardComponent } from '../../shared/exercise-card/exercise-card.component';
import { ExerciseEditCardComponent } from '../../shared/exercise-edit-card/exercise-edit-card.component';

@Component({
  selector: 'app-daily-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ExerciseCardComponent,
    ExerciseEditCardComponent,
  ],
  templateUrl: './daily-card.component.html',
  styleUrl: './daily-card.component.css',
})
export class DailyCardComponent {
  @Input({ required: true }) day!: WorkoutPerDay;
  @Input({ required: true }) header!: string;

  showExerciseEdit = false;
  exerciseToEdit!: Exercise;

  onClickEditExercise(exercise: Exercise) {
    this.exerciseToEdit = exercise;
    this.showExerciseEdit = true;
  }

  onClickCloseEdit() {
    this.showExerciseEdit = false;
  }
}
