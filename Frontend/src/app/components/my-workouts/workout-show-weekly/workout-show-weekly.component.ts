import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../../../class/workout';
import { CommonModule } from '@angular/common';
import { DailyCardComponent } from '../daily-card/daily-card.component';
import { WorkoutPerDay } from '../../../class/workoutPerDay';
import { CustomDateFormatPipe } from '../../../pipes/custom-date-format.pipe';

@Component({
  selector: 'app-workout-show-weekly',
  standalone: true,
  imports: [
    DailyCardComponent,
    CommonModule,
    DailyCardComponent,
    CustomDateFormatPipe,
  ],
  templateUrl: './workout-show-weekly.component.html',
  styleUrl: './workout-show-weekly.component.css',
})
export class WorkoutShowWeeklyComponent implements OnInit {
  @Input({ required: true, alias: 'workoutToShow' }) workout!: Workout;

  weeks: WorkoutPerDay[][] = [];
  selectedWeekIndex = 0;

  ngOnInit(): void {
    this.workout.workoutPerDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ); // Sort by day
    this.splitWeeks();
  }

  splitWeeks(): void {
    let currentWeek: WorkoutPerDay[] = [];
    let weekStartDate: Date | null = null;

    this.workout.workoutPerDays.forEach((day) => {
      const dayDate = new Date(day.date);

      if (!weekStartDate) {
        weekStartDate = new Date(dayDate);
      }

      const daysDiff =
        (dayDate.getTime() - weekStartDate.getTime()) / (1000 * 60 * 60 * 24);

      if (daysDiff >= 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
        weekStartDate = new Date(dayDate);
      }

      currentWeek.push(day);
    });

    if (currentWeek.length > 0) {
      this.weeks.push(currentWeek);
    }
  }

  selectWeek(index: number): void {
    this.selectedWeekIndex = index;
  }
}
