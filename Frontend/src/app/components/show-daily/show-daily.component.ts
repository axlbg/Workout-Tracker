import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutPerDay } from '../../class/workoutPerDay';
import { DayOfWeekPipe } from '../../pipes/day-of-week.pipe';

@Component({
  selector: 'app-show-daily',
  imports: [FormsModule, CommonModule, DayOfWeekPipe],
  templateUrl: './show-daily.component.html',
  styleUrl: './show-daily.component.css',
})
export class ShowDailyComponent {
  @Input({ required: true }) day!: WorkoutPerDay | null;
}
