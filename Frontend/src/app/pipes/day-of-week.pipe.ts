import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeek } from '../class/workoutPerDay';

@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {
  transform(dayOfWeek: DayOfWeek, ...args: unknown[]): string {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return days[dayOfWeek];
  }
}
