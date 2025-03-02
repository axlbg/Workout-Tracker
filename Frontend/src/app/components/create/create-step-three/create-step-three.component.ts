import { Component, Input } from '@angular/core';
import { DayOfWeek, WorkoutPerDay } from '../../../class/workoutPerDay';
import { CreateDailyComponent } from '../create-daily/create-daily.component';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-create-step-three',
  standalone: true,
  imports: [CarouselModule, CreateDailyComponent],
  templateUrl: './create-step-three.component.html',
  styleUrl: './create-step-three.component.css',
})
export class CreateStepThreeComponent {
  @Input({ required: true }) days!: DayOfWeek[];
  workoutPerDays: WorkoutPerDay[] = [];

  constructor() {}

  eventRefreshWorkoutPerDay(workoutPerDay: WorkoutPerDay) {
    const index = this.workoutPerDays.findIndex(
      (wpd) => wpd.dayOfWeek === workoutPerDay.dayOfWeek
    );

    if (index !== -1) {
      //if exists
      this.workoutPerDays[index] = { ...workoutPerDay };
    } else {
      this.workoutPerDays.push(workoutPerDay);
    }
  }

  getData() {
    return this.workoutPerDays;
  }
}
