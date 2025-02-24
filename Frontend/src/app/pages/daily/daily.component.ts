import { Component } from '@angular/core';
import { ShowDailyComponent } from '../../components/show-daily/show-daily.component';
import { DayOfWeek, WorkoutPerDay } from '../../class/workoutPerDay';
import { Exercise, MuscleGroup } from '../../class/exercise';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-daily',
  imports: [ShowDailyComponent, NavbarComponent],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css',
})
export class DailyComponent {
  day: WorkoutPerDay = new WorkoutPerDay(
    DayOfWeek.MONDAY,
    [
      new Exercise('Pull-ups', {
        muscleGroup: MuscleGroup.BACK,
        sets: 4,
        reps: 8,
        weight: 0,
        rir: 2,
      }),
      new Exercise('Deadlift', { sets: 3, reps: 5, weight: 100 }),
    ],
    new Date('2024-02-23')
  );
}
