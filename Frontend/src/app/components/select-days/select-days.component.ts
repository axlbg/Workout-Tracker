import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Day, DayOfWeek } from '../../class/workoutPerDay';

@Component({
  selector: 'app-select-days',
  imports: [CardModule, CommonModule],
  templateUrl: './select-days.component.html',
  styleUrl: './select-days.component.css',
})
export class SelectDaysComponent {
  days = [
    { name: 'Monday', selected: false, value: DayOfWeek.MONDAY },
    { name: 'Tuesday', selected: false, value: DayOfWeek.TUESDAY },
    { name: 'Wednesday', selected: false, value: DayOfWeek.WEDNESDAY },
    { name: 'Thursday', selected: false, value: DayOfWeek.THURSDAY },
    { name: 'Friday', selected: false, value: DayOfWeek.FRIDAY },
    { name: 'Saturday', selected: false, value: DayOfWeek.SATURDAY },
    { name: 'Sunday', selected: false, value: DayOfWeek.SUNDAY },
  ];
  daysChange = output<Day[]>();

  clickDay(): void {
    const selectedDays: Day[] = this.days
      .filter((day) => day.selected)
      .map(({ name, value }) => ({ name, dayOfWeek: value }));
    this.daysChange.emit(selectedDays);
  }
}
