import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../../../class/workout';
import { CommonModule, DatePipe } from '@angular/common';
import { DailyCardComponent } from '../daily-card/daily-card.component';
import { WorkoutPerDay } from '../../../class/workoutPerDay';
import { CustomDateFormatPipe } from '../../../pipes/custom-date-format.pipe';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-workout-show-weekly',
  standalone: true,
  imports: [
    DailyCardComponent,
    CommonModule,
    DailyCardComponent,
    CustomDateFormatPipe,
    SelectModule,
    FormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './workout-show-weekly.component.html',
  styleUrl: './workout-show-weekly.component.css',
})
export class WorkoutShowWeeklyComponent implements OnInit {
  @Input({ required: true, alias: 'workoutToShow' }) workout!: Workout;

  weeks: WorkoutPerDay[][] = [];
  selectedWeekIndex = 0;

  selectedWeek: number | null = null;

  weeksOptions: any;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.workout.workoutPerDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ); // Sort by day
    this.splitWeeks();
    this.weeksOptions = this.generateWeekOptions();
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

  private generateWeekOptions() {
    return this.weeks.map((week, i) => ({
      label: `Week ${i + 1} (${this.datePipe.transform(
        week[0].date,
        'dd/MM/yyyy'
      )} - ${this.datePipe.transform(
        week[week.length - 1].date,
        'dd/MM/yyyy'
      )})`,
      value: i,
    }));
  }
}
