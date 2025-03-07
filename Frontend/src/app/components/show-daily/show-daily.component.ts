import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutPerDay } from '../../class/workoutPerDay';
import { DayOfWeekPipe } from '../../pipes/day-of-week.pipe';
import { ButtonModule } from 'primeng/button';
import { ExerciseCardComponent } from '../shared/exercise-card/exercise-card.component';
import { CardModule } from 'primeng/card';
import { ExerciseEditCardComponent } from '../shared/exercise-edit-card/exercise-edit-card.component';
import { Exercise } from '../../class/exercise';
import { CustomDateFormatPipe } from '../../pipes/custom-date-format.pipe';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-show-daily',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    ExerciseCardComponent,
    CardModule,
    ExerciseEditCardComponent,
    CustomDateFormatPipe,
    PanelModule,
  ],
  templateUrl: './show-daily.component.html',
  styleUrl: './show-daily.component.css',
})
export class ShowDailyComponent {
  @Input({ required: true }) day!: WorkoutPerDay | null;
  markAllAsCompleted = output();
  saveExercise = output<Exercise>();

  exerciseToEdit!: Exercise;
  showExerciseEdit = false;

  emitMarkAllAsCompleted() {
    this.markAllAsCompleted.emit();
  }

  onClickEditExercise(exercise: Exercise) {
    this.exerciseToEdit = exercise;
    this.showExerciseEdit = true;
  }

  onClickCloseEdit() {
    this.showExerciseEdit = false;
  }
}
