import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../../../class/workout';
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../../class/exercise';
import { ButtonModule } from 'primeng/button';
import { WorkoutPerDay } from '../../../class/workoutPerDay';

@Component({
  selector: 'app-workout-show-table',
  standalone: true,
  imports: [TableModule, CommonModule, SelectModule, FormsModule, ButtonModule],
  templateUrl: './workout-show-table.component.html',
  providers: [DatePipe],
  styleUrl: './workout-show-table.component.css',
})
export class WorkoutShowTableComponent implements OnInit {
  @Input({ required: true, alias: 'workoutToShow' }) workout!: Workout;

  rowStyle(exercise: Exercise) {
    return {
      'background-color': exercise.completed ? 'green' : '',
    };
  }

  months: WorkoutPerDay[][] = [];
  selectedMonthIndex = 0;

  selectedMonth: number | null = null;

  monthsOptions: any;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.workout.workoutPerDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ); // Sort by day
    this.splitMonths();
    this.monthsOptions = this.generateMonthOptions();
  }

  splitMonths(): void {
    let currentMonth: WorkoutPerDay[] = [];
    let monthStartDate: Date | null = null;

    this.workout.workoutPerDays.forEach((day) => {
      const dayDate = new Date(day.date);

      if (!monthStartDate) {
        monthStartDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), 1);
      }

      if (
        dayDate.getMonth() !== monthStartDate.getMonth() ||
        dayDate.getFullYear() !== monthStartDate.getFullYear()
      ) {
        this.months.push(currentMonth);
        currentMonth = [];
        monthStartDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), 1);
      }

      currentMonth.push(day);
    });

    if (currentMonth.length > 0) {
      this.months.push(currentMonth);
    }
    console.log(this.months);
    console.log('-------------------------');
    console.log('-------------------------');
    console.log('-------------------------');
    console.log(this.workout.workoutPerDays);
  }

  selectMonth(index: number): void {
    this.selectedMonthIndex = index;
  }

  private generateMonthOptions() {
    return this.months.map((month, i) => ({
      label: `Month ${i + 1} (${this.datePipe.transform(
        month[0].date,
        'dd/MM/yyyy'
      )} - ${this.datePipe.transform(
        month[month.length - 1].date,
        'dd/MM/yyyy'
      )})`,
      value: i,
    }));
  }
}
