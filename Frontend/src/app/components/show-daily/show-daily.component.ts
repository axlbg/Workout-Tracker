import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutPerDay } from '../../class/workoutPerDay';
import { DayOfWeekPipe } from '../../pipes/day-of-week.pipe';
import { ButtonModule } from 'primeng/button';
import { ExerciseCardComponent } from '../exercise-card/exercise-card.component';

@Component({
  selector: 'app-show-daily',
  imports: [
    FormsModule,
    CommonModule,
    DayOfWeekPipe,
    ButtonModule,
    ExerciseCardComponent,
  ],
  templateUrl: './show-daily.component.html',
  styleUrl: './show-daily.component.css',
})
export class ShowDailyComponent {
  @Input({ required: true }) day!: WorkoutPerDay | null;
}
