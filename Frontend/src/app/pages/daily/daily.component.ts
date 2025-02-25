import { Component } from '@angular/core';
import { ShowDailyComponent } from '../../components/show-daily/show-daily.component';
import { WorkoutPerDay } from '../../class/workoutPerDay';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiWorkoutService } from '../../services/api-workout.service';
import { Workout } from '../../class/workout';

@Component({
  selector: 'app-daily',
  imports: [ShowDailyComponent, NavbarComponent],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css',
})
export class DailyComponent {
  day: WorkoutPerDay | null = null;

  constructor(private apiWorkout: ApiWorkoutService) {
    this.findWorkouts();
  }

  findWorkouts() {
    this.apiWorkout.getWorkouts().subscribe((workouts) => {
      if (workouts) this.day = this.filterByToday(workouts);
      console.log(workouts);
      console.log(this.day);
    });
  }

  filterByToday(workouts: Workout[]): WorkoutPerDay | null {
    let today = new Date();
    let returnWpd = null;
    console.log(today);
    for (const w of workouts) {
      if (w.workoutPerDays) {
        for (const wpd of w.workoutPerDays) {
          if (wpd.date && this.isSameDay(new Date(wpd.date), today)) {
            console.log('VICTORIAAAAAAAAAAAAA');
            returnWpd = wpd;
            break;
          }
        }
      }
      if (returnWpd) break;
    }
    return returnWpd;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
