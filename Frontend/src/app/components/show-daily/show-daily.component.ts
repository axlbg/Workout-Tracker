import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutPerDay } from '../../class/workoutPerDay';
import { DayOfWeekPipe } from '../../pipes/day-of-week.pipe';
import { ButtonModule } from 'primeng/button';
import { ExerciseCardComponent } from '../shared/exercise-card/exercise-card.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-show-daily',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DayOfWeekPipe,
    ButtonModule,
    ExerciseCardComponent,
    CardModule,
  ],
  templateUrl: './show-daily.component.html',
  styleUrl: './show-daily.component.css',
})
export class ShowDailyComponent {
  @Input({ required: true }) day!: WorkoutPerDay | null;
  markAllAsCompleted = output();

  emitMarkAllAsCompleted() {
    this.markAllAsCompleted.emit();
  }
}
