import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DayOfWeek } from '../../class/workoutPerDay';
import { DayOfWeekPipe } from '../../pipes/day-of-week.pipe';

@Component({
  selector: 'app-select-days',
  imports: [CardModule, CommonModule, DayOfWeekPipe],
  templateUrl: './select-days.component.html',
  styleUrl: './select-days.component.css',
})
export class SelectDaysComponent {
  days = [
    { selected: false, value: DayOfWeek.MONDAY },
    { selected: false, value: DayOfWeek.TUESDAY },
    { selected: false, value: DayOfWeek.WEDNESDAY },
    { selected: false, value: DayOfWeek.THURSDAY },
    { selected: false, value: DayOfWeek.FRIDAY },
    { selected: false, value: DayOfWeek.SATURDAY },
    { selected: false, value: DayOfWeek.SUNDAY },
  ];
  daysChange = output<DayOfWeek[]>();

  clickDay(): void {
    const selectedDays: DayOfWeek[] = this.days
      .filter((day) => day.selected)
      .map((day) => day.value);
    this.daysChange.emit(selectedDays);
  }
}
